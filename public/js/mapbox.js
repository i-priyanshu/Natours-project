const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaS1wcml5YW5zaHUiLCJhIjoiY2t5cjh1a2lxMGFpaTJ5czA2OGc4OGowYyJ9.0YkIJhJCvp906dTl5IjeFA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/i-priyanshu/ckyranf18comb15pwblrmisg5',
});
