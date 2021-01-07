import L from 'leaflet';

class Map {
  constructor() {
    this.mapWrapper = document.createElement('div');
    this.mapWrapper.classList.add('map-wrapper');
    this.map = L.map(this.mapWrapper).setView([53.9132573, 27.5943], 6);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        noWrap: true,
        // attribution:
        //   'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        // maxZoom: 6,
        id: 'mapbox/streets-v11',
        tileSize: 1024,
        // zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoibGlsaWFubmEwNDAiLCJhIjoiY2tqZTZtNmIwMDM0ajJ6bzc0cDJjdXlsZyJ9.gam3TtHimf_FZn3rRdR_JA',
      }
    ).addTo(this.map);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(this.map);

    // L.marker([51.5, -0.09]).addTo(map)
    //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //     .openPopup();
  }

  showMap() {
    return this.mapWrapper;
  }
}

export default Map;
