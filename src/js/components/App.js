import MapView from 'js/components/MapView';
import Header from 'js/components/Header';
import Filter from 'js/components/Filter';
import React, { Component } from 'react';
import { TEXT } from 'js/config';

export default class App extends Component {
  displayName: 'App';

  state = {
    filter: ""
  };

  // Update filter state
  updateFilter = event => {
    const copiedState = {...this.state};
    console.log('copy',copiedState);
    copiedState.filter = event.target.value;
    this.setState({filter: copiedState.filter});
  };

  render () {
    return (
      <div className='root'>
        <Header title={TEXT.title} subtitle={TEXT.subtitle} />
        <Filter updateFilter={this.updateFilter} />
        <MapView filter={this.state.filter} />
      </div>
    );
  }

}
