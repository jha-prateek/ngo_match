import React, { Component } from "react";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.getGeoLocation = this.getGeoLocation.bind(this);
        this.showGeoLocation = this.showGeoLocation.bind(this);
        this.getCovidStats = this.getCovidStats.bind(this);
        this.getFullAddress = this.getFullAddress.bind(this);
        this.initMap = this.initMap.bind(this);
    }

    getFullAddress(lat, long){

        let country; 
        
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${this.state.googleApiKeys}`;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            country = (data['results'][0]['address_components'][data['results'][0]['address_components'].length - 2]['long_name']);         
            this.setState({
                'country': country
            });         
        });
    }

    initMap(lat, long){
        let url = `https://www.google.com/maps/embed/v1/view?key=${this.state.googleApiKeys}
        &center=${lat},${long}
        &zoom=11`;
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

			console.log('Your current position is:');
			console.log(`Latitude : ${crd.latitude}`);
			console.log(`Longitude: ${crd.longitude}`);
			console.log(`More or less ${crd.accuracy} meters.`);
	
			self.setState({
				'Lat': crd.latitude,
				'Long': crd.longitude
			});

            self.getFullAddress(crd.latitude, crd.longitude);
		}
	
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    showGeoLocation(lat, long, country){
        if(lat && long){
            return `${lat}, ${long} in ${country}`;
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
			<div className="location">
				<h4>Your current postion is {this.showGeoLocation(this.state.Lat, this.state.Long, this.state.country)}</h4>
			</div>
		);
	}
}


export default App;
