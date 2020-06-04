import React, { Component } from "react";
import './App.css';
import DetailList from './components/DetailList';
import Search from './components/Search.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.getGeoLocation = this.getGeoLocation.bind(this);
        this.showGeoLocation = this.showGeoLocation.bind(this);
        this.getNGOData = this.getNGOData.bind(this);
        this.searchViaUserInput = this.searchViaUserInput.bind(this);
    }

    getNGOData(){
        let apiURL;
        if(this.state.citySearchVal !== undefined){
            apiURL = `http://localhost:8000/api/ngos/search?city=${this.state.citySearchVal}`;
        }else{
            apiURL = `http://localhost:8000/api/ngos/at?lat=${this.state.Lat}&lon=${this.state.Long}`
        }
        fetch(apiURL)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    'ngo_data':{
                        isLoaded: (result.found_entries === 0 ? false: true),
                        items: result.data
                    }
                });
            },
            (error) => {
                this.setState({
                    'ngo_data':{
                        isLoaded: false
                    }
                });
            }
        )
    }

    searchViaUserInput(value){
        this.setState({
            'citySearchVal': value
        }, () => {
            this.getNGOData();
        });
    }

    getGeoLocation(){
        let self = this; // https://stackoverflow.com/a/36689903/7379584

		navigator.geolocation.getCurrentPosition(
        function (pos){
			let crd = pos.coords;
            self.setState({
				'Lat': crd.latitude,
				'Long': crd.longitude
			}, () => {
                self.getNGOData();
            });
            
		}, 
        function(err){
            console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		});
    }

    showGeoLocation(lat, long){
        if(lat && long){
            return `${lat}, ${long}`;
        }
    }

    componentDidMount() {
        this.getGeoLocation();
        this.setState({
            'googleApiKeys': require('./config.json').GoogleAPIKey
        });   
    }

    render() {

		return (
			<div className="main-body">
                <Search onSelect={this.searchViaUserInput}/>
                <h4 className="geo-loc">Your current postion is {this.showGeoLocation(this.state.Lat, this.state.Long)}</h4>
                <DetailList api_data={this.state.ngo_data}/>
			</div>
		);
	}
}


export default App;
