import React, { Component } from "react";

export default class Detail extends Component{
    render(){
        let contact2, contact1, website;
        if(this.props.contact_1 !== 'nan'){
            contact1 = <h5>Telephone: <a href={"tel:" + this.props.contact_1}>{this.props.contact_1}</a></h5>
        }
        if(this.props.contact_2 !== 'nan'){
            contact2 = <h5>Telephone: <a href={"tel:" + this.props.contact_2}>{this.props.contact_2}</a></h5>
        }
        if(this.props.website !== 'nan'){
            website = <h5>Website: <a href={this.props.website} target="_blank" rel="noopener noreferrer">{this.props.website}</a></h5>
        }

        return (
            <div className="detail-card">
                <h5>Name: {this.props.ngo_name}</h5>
                <h5>Address: {this.props.full_address}</h5>
                {contact1}
                {contact2}
                {website}
            </div>
        )
    }
}