import React, { Component } from "react";

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            suggestions: [],
            text: '',
            citiesData: []
        };

        this.suggestionContainer = React.createRef();

        this.autoCompleteIt = this.autoCompleteIt.bind(this);
        this.renderSuggentions = this.renderSuggentions.bind(this);
        this.selectSuggestion = this.selectSuggestion.bind(this);
        this.getCitiesData = this.getCitiesData.bind(this);
    }

    autoCompleteIt(e){
        const textVal = e.target.value;
        let newSuggestions = [];
        const {citiesData} = this.state;
        if(textVal.length > 0 && citiesData.isLoaded){
            const regex = new RegExp(`^${textVal}`, 'i');
            const cityList = citiesData.items;
            newSuggestions = cityList.filter((word) => regex.test(word));
        }
        this.setState({
            text: textVal,
            suggestions: newSuggestions
        });
    }

    renderSuggentions(){
        const {suggestions} = this.state;
        if(suggestions.length === 0){
            if(this.suggestionContainer.current !== null){
                this.suggestionContainer.current.style.display = "None";
            }
            return null;
        }
        this.suggestionContainer.current.style.display = "block";
        return(
            suggestions.map((item, idx) => <li className="suggestions-list-item" key={idx} onClick={()=>this.selectSuggestion(item)} >{item}</li>)
        )
    }

    selectSuggestion(value){
        this.setState({
            text: value,
            suggestions: []
        });
    }

    getCitiesData(){
        let apiURL = `http://localhost:8000/api/cities/`;
        fetch(apiURL)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    citiesData:{
                        isLoaded: (result.status === 'ok' ? true: false),
                        items: result.data,
                        entriesFound: result.entries
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

    componentDidMount(){
        this.getCitiesData();
    }

    render(){
        const {text} = this.state;
        return (
            <div className="main-input">
                <input type="text" value={text} onChange={this.autoCompleteIt} placeholder="Your City" required pattern="\S+.*"/>
                <ul ref={this.suggestionContainer} className="suggestions-list">
                    {this.renderSuggentions()}
                </ul>
            </div>
        )
    }
}