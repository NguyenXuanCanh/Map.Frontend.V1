var polyline = require("@mapbox/polyline");

export function stringToGETJSON(string) {
  return polyline.toGeoJSON(string);
}
