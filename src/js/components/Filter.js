import React, { Component } from "react";

export default class Filter extends Component {
  
  locations = ['Clear Creek', 'Eagle', 'Pitkin', 'Routt'];  
  render() {
    return (
    <div className="filter">
       <fieldset>
            <legend>Filter ski resorts by area</legend>
            <div className="radio">
                <input 
                type="radio" 
                name="filter-ski-resort" 
                id="None" 
                value=""  
                key="None" 
                onClick={this.props.updateFilter} 
                checked={this.props.filter === ""} 
                />
                <label htmlFor="None">None</label>
            </div>
            {this.locations.map(location => {
                return (
                <div className="radio">
                    <input 
                    type="radio" 
                    name="filter-ski-resort" 
                    id={location}
                    value={location}
                    key={location}
                    onClick={this.props.updateFilter} 
                    checked={this.props.filter === location}
                    /> 
                    <label htmlFor={location}>{location}</label>
                </div>
                );
            })}
        </fieldset>
    </div>
    );
  }
}