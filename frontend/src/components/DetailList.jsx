import React, { Component } from "react";
// import Details from './Details.jsx';

export default class DetailList extends Component {
    render() {
        let ngo_details = this.props.api_data;
        let details;
        let tableDetails;
        if (ngo_details !== undefined && ngo_details.isLoaded) {
            tableDetails = ngo_details.items.map(data => {
                return (
                    <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.full_address}</td>
                        <td><a href={"tel:" + data.contact_2}>{data.contact_2}</a></td>
                        <td><a href={"tel:" + data.contact_1}>{data.contact_1}</a></td>
                        <td><a href={data.website} target="_blank" rel="noopener noreferrer">{data.website}</a></td>
                    </tr>
                );
            });
        }

        return (
            <div className="detail-list-container">
                <table className="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Full Address</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableDetails}
                    </tbody>
                </table>
            </div>
        )
    }
}