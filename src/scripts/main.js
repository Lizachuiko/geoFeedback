
// function initMap() {  // why not work?
window.initMap = function() {
	var uluru = {lat: 55.753215, lng: 37.622504};
	var map = new google.maps.Map(document.getElementById('map'), 
	
	{
		zoom: 13.5,
		center: uluru
	});

	var image = 'img/marker.png';

	var markers = locations.map(function(location, i) {
		return new google.maps.Marker({
			position: location,
			icon: image
		});
	});

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }
      var locations = [
        {lat: 55.757096, lng: 37.627176},
        {lat: 55.752358, lng: 37.637733},
      ]



			// google.maps.event.addListener(marker, 'click', function() {
			// 	marker.setIcon("img/markerRed.png");
			// 	infowindow.open(map);
			// 	});

