import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
    <div className="filter">
       <fieldset>
            <legend>Filter ski resorts by area</legend>
            <div className="radio">
                <input type="radio" name="filter-ski-resort" id="no-filter" value=""  onClick={this.props.updateFilter} defaultChecked />
                <label htmlFor="no-filter">None</label>
            </div>
            <div className="radio">
                <input type="radio" name="filter-ski-resort" id="clear-creek" value="Clear Creek" onClick={this.props.updateFilter} /> 
                <label htmlFor="clear-creek">Clear Creek</label>
            </div>
            <div className="radio">
                <input type="radio" name="filter-ski-resort" id="eagle" value="Eagle" onClick={this.props.updateFilter} /> 
                <label htmlFor="eagle">Eagle</label>
            </div>
            <div className="radio">
                <input type="radio" name="filter-ski-resort" id="pitkin" value="Pitkin" onClick={this.props.updateFilter} />
                <label htmlFor="pitkin">Pitkin</label>
            </div>
            <div className="radio">
                <input type="radio" name="filter-ski-resort" id="routt" value="Routt" onClick={this.props.updateFilter} /> 
                <label htmlFor="routt">Routt</label>
            </div>
        </fieldset>
    </div>
    );
  }
}

/* <select name="filter" onChange={handleFilter} className="menu" value={filter}>
                <option value="247">2000+</option>
                <option value="">All</option>
                <option value="1982">1k - 2k</option>
                <option value="0-1k feet">0 - 1k feet</option>
            </select>   */