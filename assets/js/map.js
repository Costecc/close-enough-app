

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 52.229802, lng: 21.011818}
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay);
  document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  var markersArray = [];

  map.addListener('click', function(event) {
    markersArray.map(marker => marker.setMap(null));

    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    console.log(latitude);

    var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,
      title: 'Click to zoom'
    });

    markersArray.push(marker);

  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: {lat: 52.219827, lng: 21.018017},  // Haight.
    destination: {lat: 52.238143, lng: 21.051684},  // Ocean Beach.
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
  if (status == 'OK') {
  directionsDisplay.setDirections(response);
  } else {
  window.alert('Directions request failed due to ' + status);
  }
  });

}
