const turf = require("@turf/turf");
exports.findCenter = (data) => {
//   console.log(data);
  console.log("Find Har Pong");
  if (data.length === 0) {
    return null;
  }
  //map data
  const feature = data.map((item) => {
    return turf.point([item.lng, item.lat]);
  });
  const featureCollection = turf.featureCollection(feature);

  const center = turf.center(featureCollection);

  const lat = center.geometry.coordinates[1];
  const lng = center.geometry.coordinates[0];
  console.log([lat, lng]);
  //   console.log (featureCollection)
  //   console.log(center)
  return [lat, lng];
};