import React, { Component } from "react";
import Details from './Details.jsx';

export default class DetailList extends Component{
    render(){
        let ngo_details = this.props.api_data;
        let details;
        if(ngo_details !== undefined && ngo_details.isLoaded){
            details = ngo_details.items.map((data) => {
                return (
                <li key={data.id}>
                    <Details ngo_name={data.name} full_address={data.full_address} 
                    contact_1={data.contact_1} contact_2={data.contact_2} website={data.website}/>
                </li>
                ); 
            });
        }

        return (
            <div className="detail-list-container">
                <ul>
                    {details}
                </ul>
            </div>
        )
    }
}