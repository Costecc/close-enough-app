var markersArray = [];

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 52.229802, lng: 21.011818}
  });

  directionsDisplay.setMap(map);

  map.addListener('click', function(event) {
    markersArray.map(marker => marker.setMap(null));

    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();

    var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,

    });

    markersArray.push(marker);

    calculateAndDisplayRoute(directionsService, directionsDisplay);

  });

  document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: markersArray.length === 0 ? {lat: 52.219827, lng: 21.018017} : markersArray[markersArray.length - 1].position,
    destination: {lat: 52.229802, lng: 21.011818},
    travelMode: selectedMode
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
