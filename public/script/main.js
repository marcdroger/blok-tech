const locationElement = document.getElementById('location');
const mapElement = document.getElementById('map');

//array for coordinates & names students later used for generating markers
let features = [];

//acces token for mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2Ryb2dlciIsImEiOiJjbDNiYzFtNnMwZHlhM2NycXdkdGh2MTZmIn0.B26KwzBntG-ArQRPsYBu6Q';

window.onload = getCurrentLocation();

function getCurrentLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationElement.innerHTML = `Can't get current location`;
  }
}

function showPosition(position) {
  locationElement.innerHTML = `Lat: ${position.coords.latitude} Long: ${position.coords.longitude}`;
}

if(mapElement) {
  //generate mapbox map and style
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [10, 30],
    zoom: 1.2
  });

  //this function loads the students data from the students route that are
  //needed for the markers and popups on the map
  map.on('load', async () => {
    const response = await fetch('/students');
    const data = await response.json();

    //generate coordinates universites and student info to to features array
    data.forEach((student) => {
      feature = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [ student.longitude, student.latitude ]
        },
        'properties': {
          'title': `${student.firstname} ${student.lastname}`,
          'education': `${student.education}`,
          'school': `${student.currentSchool}`,
          'email': `${student.email}`
        }
      }
      features.push(feature)
    })

    //add the features array with students data to the map
    map.addSource("students", {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': features
      }
    })

    //generate markers and popups for the map using the coordinates and info
    //from the features array
    features.forEach((marker) => {
      //popup layout
      let popup = new mapboxgl.Popup().setHTML(`
        <div class='popup'>
          <h2>${marker.properties.title}</h2>
          <p>Studying: ${marker.properties.education}</p>
          <p>School: ${marker.properties.school}</p>
          <a href='mailto:${marker.properties.email}'>Email</a>
        </div>
      `);

      //generate marker at coordinates from features array including a popup
      new mapboxgl.Marker().setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(map);
    })

    //add fullscreen toggle button for the map
    map.addControl(new mapboxgl.FullscreenControl());
  })
}

