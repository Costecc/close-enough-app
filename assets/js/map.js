const markersArray = [];
const offersArray = [];

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 52.229802, lng: 21.011818}
  });

  setTimeout(()=> {offersArray.map(offer => {
    let newMarker = new google.maps.Marker({
      position: {lat: offer.location_x, lng: offer.location_y},
      map: map,
    });

    console.log(offersArray)
  })
  }, 2000)

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



// testing fetching data

function getOffers() {
  let allOffers = [];
  const url = 'http://192.168.1.94:8000/top_result/';
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: {
      "location_x": 52.229802,
      "location_y": 21.011818,
      "is_worker": true,
      "transport": "driving",
      "max_time": 10,
      "min_salary": 0

    }
  }).done(function(response) {
    response.entities.forEach(result => offersArray.push(result));
    console.log(response.entities);
    console.log(offersArray)
  }).fail(function(error) {
    console.log(error);
  });
}

getOffers();
