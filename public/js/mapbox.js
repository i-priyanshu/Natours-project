export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaS1wcml5YW5zaHUiLCJhIjoiY2t5cjh1a2lxMGFpaTJ5czA2OGc4OGowYyJ9.0YkIJhJCvp906dTl5IjeFA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/i-priyanshu/ckyranf18comb15pwblrmisg5',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} : ${loc.description}`)
      .addTo(map);

    // Extend map bounds to include current locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
