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
import skiResort from '../../images/ski-resort.png';
import Search from 'esri/widgets/Search';

export default class Map extends Component {
  displayName: 'Map';
  state = appStore.getState();
  view = {};
  skiResortsLayer = {};

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
    const popupSkiResorts = {
      "title": "Ski Resort Information ⛷️",
      "content": "<b>Name:</b> {Name}<br><b>Location:</b> {NAME_1}, {STATE_NAME}"
    }

    // Create renderer with custom marker for ski resorts
    const skiResortsRenderer = {
      "type": "simple",
      "symbol": {
        "type": "picture-marker",
        "url": skiResort,
        "width": 12,
        "height": 12
      }
    }
    
    // Create the layer for ski resorts in Colorado and set a custom marker renderer. Initialize with definitionExpression set to an empty string to show all ski resorts by default.
    const skiResorts = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/Colorado%20Ski%20Resorts/FeatureServer",
      outFields: ["Name", "NAME_1", "STATE_NAME"],
      popupTemplate: popupSkiResorts,
      renderer: skiResortsRenderer,
      definitionExpression: ""
    });
    
    // Store skiResorts layer in featureLayer to reference later in componentDidUpdate lifecycle.
    this.skiResortsLayer = skiResorts;

    // Add the layer
    map.add(skiResorts);

    promise.then(view => {
      this.view = view;
      appStore.dispatch(viewCreated());
      //- Webmap from https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
      // appStore.dispatch(getItemInfo('e691172598f04ea8881cd2a4adaa45ba'));

    // Add Search widget
    const search = new Search({
      view: this.view
      //container: this.refs.searchBar
    });

    // TODO: Tried creating a ref for LocateModal as well as passing down search widget via props to LocateModal. Neither method worked. For now, attach search to view's UI.
    view.ui.add(search, "bottom-right");
          
    // Find address 
    view.on("click", event => {
      search.clear(); 
      view.popup.clear();
      if (search.activeSource) {
        const geocoder = search.activeSource.locator; // World geocode service
        geocoder.locationToAddress(event.mapPoint)
          .then(response => { // Show the address found
            const address = response.address;
            showPopup(address, event.mapPoint);
          }, error => { // Show no address found
            showPopup("No address found.", event.mapPoint);
          });
      }
    });
    
    function showPopup(address, pt) {
      view.popup.open({
        title:  + Math.round(pt.longitude * 100000)/100000 + "," + Math.round(pt.latitude * 100000)/100000,
        content: address,
        location: pt
      });
    }
  });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Update definitionsExpression for skiResortsLayer when a filter is selected. If no filter (none) is selected, resets definitionExpression back to an empty string.
  componentDidUpdate() {
    if (this.props.filter !== ""){
      this.skiResortsLayer.definitionExpression = `NAME_1 = '${this.props.filter}'`;
    } else {
      this.skiResortsLayer.definitionExpression = "";
    }
  }

  //TODO: Create a custom field to query on for the definitionExpression instead of using the fields listed in the Colorado Ski Resorts FeatureServer. Would like to query on distance instead of place names.

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
