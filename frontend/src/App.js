import React, { Component } from "react";
import './App.css';
import DetailList from './components/DetailList';
import Search from './components/Search';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.getGeoLocation = this.getGeoLocation.bind(this);
        this.showGeoLocation = this.showGeoLocation.bind(this);
        this.getCovidStats = this.getCovidStats.bind(this);
        this.getFullAddress = this.getFullAddress.bind(this);
        this.initMap = this.initMap.bind(this);
        this.getNGOData = this.getNGOData.bind(this);
    }

    getNGOData(){
        let apiURL = `http://localhost:8000/api/ngos/at/?lat=${this.state.Lat}&lon=${this.state.Long}`
        fetch(apiURL)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    'ngo_data':{
                        isLoaded: (result.found_entries === 0 ? false: true),
                        items: result
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

    getFullAddress(lat, long){

    }

    initMap(lat, long){
        // let url = `https://www.google.com/maps/embed/v1/view?key=${this.state.googleApiKeys}
        // &center=${lat},${long}
        // &zoom=11`;
    }

    getGeoLocation(){

        let self = this; // https://stackoverflow.com/a/36689903/7379584

        var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
	

		function success(pos) {
			var crd = pos.coords;
	
			self.setState({
				'Lat': crd.latitude,
				'Long': crd.longitude
			});
            
            self.getNGOData();
            self.getFullAddress(crd.latitude, crd.longitude);
		}
	
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    showGeoLocation(lat, long){
        if(lat && long){
            return `${lat}, ${long}`;
        }
    }

    getCovidStats(){

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
                <navbar className="navbar"><Search/></navbar>
                <h4 className="geo-loc">Your current postion is {this.showGeoLocation(this.state.Lat, this.state.Long)}</h4>
                <DetailList api_data={this.state.ngo_data}/>
			</div>
		);
	}
}


export default App;
