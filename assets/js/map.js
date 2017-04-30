var markersArray = [];
var offersArray = [];
var markersToShow = []
var flag = false;
arr_city = []
function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  var directionsService = new google.maps.DirectionsService;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 52.229802, lng: 21.011818}
  });



  var timerId = setInterval(() => {
      console.log('weszlo do set')






      if(flag){
        // markersToShow.forEach(marker => marker.setMap(null))
        console.log(markersToShow)
        offersArray.forEach(offer => {
            if(flag) {

              console.log('weszlo do ifa')
              var newMarker = new google.maps.Marker({
                position: {lat: offer.location_x, lng: offer.location_y},
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
              })
              markersToShow.push(newMarker)


              var rad = $('#radius').text()



                            var citymap = {
                    startPoint: {lat: 52.229802, lng: 21.011818},
                    radius: parseFloat(rad)*1200
                  };

              arr_city.forEach(elem => elem.setMap(null));
              arr_city = []
              for (var city in citymap) {
                      // Add the circle for this city to the map.

                      var cityCircle = new google.maps.Circle({
                        strokeColor: '#FF9100 ',
                        strokeOpacity: 0.8,
                        strokeWeight: 1.5,
                        fillColor: '#EDA445 ',
                        fillOpacity: 0.1,
                        map: map,
                        center: {lat: latitude, lng: longitude},
                        radius: citymap.radius,
                        draggable: false
                      });
                      arr_city.push(cityCircle);
                    }

            }
          })

          markersToShow.forEach(function(marker) {
             marker.addListener('click', function(event) {

               globalLat = marker.position.lat();
               globalLng = marker.position.lng();

              //  console.log(marker)
               calculateAndDisplayRoute(directionsService, directionsDisplay)
              //  console.log('lol')
             })
          })
        // console.log(markersToShow);
        flag = false;
      }


  }, 500)


  directionsDisplay.setMap(map);

  map.addListener('click', function(event) {
    markersArray.map(marker => marker.setMap(null));

    latitude = event.latLng.lat();
    longitude = event.latLng.lng();

    $("#search_form").find("input[name='localization_x']").val(latitude);
    $("#search_form").find("input[name='localization_y']").val(longitude)


    var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,


    });

    markersArray.push(marker);

    // calculateAndDisplayRoute(directionsService, directionsDisplay);

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
    origin: markersArray.length === 0 ? {lat: 52.219827, lng: 21.018017} : {lat: latitude, lng: longitude},
    destination: {lat: globalLat, lng: globalLng},
    travelMode: selectedMode,

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
    data: data_post
  }).done(function(response) {
    response.entities.forEach(result => offersArray.push(result));
    console.log(response.entities);
    // console.log(offersArray)
  }).fail(function(error) {
    console.log(error);
  });
}

// getOffers();
