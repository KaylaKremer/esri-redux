export const INITIAL_STATE = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const TEXT = {
  title: "Kayla's Technical Interview for Blue Raster 😄",
  subtitle: 'Colorado Ski Resorts'
};

export const MAP_OPTIONS = {
  basemap: 'streets-vector'
};

// Reset map center to focus on Colorado
export const VIEW_OPTIONS = {
  ui: { components: ['logo', 'attribution'] },
  center: [-105.782067, 39.550051],
  zoom: 5
};

export const URLS = {
  itemInfo: appid => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`
};
