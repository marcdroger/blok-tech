const mapElement=document.getElementById("map");console.log(mapElement);let features=[];mapboxgl.accessToken="pk.eyJ1IjoibWFyY2Ryb2dlciIsImEiOiJjbDNiYzFtNnMwZHlhM2NycXdkdGh2MTZmIn0.B26KwzBntG-ArQRPsYBu6Q";const map=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/light-v10",center:[10,30],zoom:1.2});map.on("load",async()=>{const e=await fetch("/students"),t=await e.json();t.forEach(e=>{feature={type:"Feature",geometry:{type:"Point",coordinates:[e.longitude,e.latitude]},properties:{title:e.firstname+" "+e.lastname,education:""+e.education,school:""+e.currentSchool,email:""+e.email}},features.push(feature)}),map.addSource("students",{type:"geojson",data:{type:"FeatureCollection",features:features}}),features.forEach(e=>{var t=(new mapboxgl.Popup).setHTML(`
      <div class='popup'>
        <h2>${e.properties.title}</h2>
        <p>Studying: ${e.properties.education}</p>
        <p>School: ${e.properties.school}</p>
        <a href='mailto:${e.properties.email}'>Email</a>
      </div>
    `);(new mapboxgl.Marker).setLngLat(e.geometry.coordinates).setPopup(t).addTo(map)}),map.addControl(new mapboxgl.FullscreenControl)});