import { viewCreated, getItemInfo } from 'js/actions/mapActions';
import { MAP_OPTIONS, VIEW_OPTIONS } from 'js/config';
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import Spinner from 'js/components/shared/Spinner';
import Controls from 'js/components/Controls';
import MapView from 'esri/views/MapView';
import React, { Component } from 'react';
import appStore from 'js/appStore';
import EsriMap from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import skiResort from '../../images/ski-resort.png'

export default class Map extends Component {
  displayName: 'Map';
  state = appStore.getState();
  view = {};

  componentDidMount() {
    // Subscribe to the store for updates
    this.unsubscribe = appStore.subscribe(this.storeDidUpdate);

    const map = new EsriMap(MAP_OPTIONS);

    // Create our map view
    const promise = new MapView({
      container: this.refs.mapView,
      map: map,
      ...VIEW_OPTIONS
    });

    // Define a popup for ski resorts
    var popupSkiResorts = {
      "title": "Ski Resort Information ⛷️",
      "content": "<b>Name:</b> {Name}<br><b>Location:</b> {NAME_1}, {STATE_NAME}"
    }

    // Create renderer for ski resorts
    const skiResortsRenderer = {
      "type": "simple",
      "symbol": {
        "type": "picture-marker",
        "url": skiResort,
        "width": 10.5,
        "height": 10.5
      }
    }
    
    // Create the layer for ski resorts in Colorado and set the renderer
    const skiResorts = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/Colorado%20Ski%20Resorts/FeatureServer",
      outFields: ["Name", "NAME_1", "STATE_NAME"],
      popupTemplate: popupSkiResorts,
      renderer: skiResortsRenderer
    });
    
    //definitionExpression: "NAME_1 = 'Clear Creek'"

    // Add the layer
    map.add(skiResorts);

    promise.then(view => {
      this.view = view;
      appStore.dispatch(viewCreated());
      //- Webmap from https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
      // appStore.dispatch(getItemInfo('e691172598f04ea8881cd2a4adaa45ba'));
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  storeDidUpdate = () => {
    this.setState(appStore.getState());
  };

  render () {
    const {shareModalVisible, locateModalVisible} = this.state;

    return (
      <div ref='mapView' className='map-view'>
        <Controls view={this.view} />
        <Spinner active={!this.view.ready} />
        <ShareModal visible={shareModalVisible} />
        <LocateModal visible={locateModalVisible} />
      </div>
    );
  }
}
