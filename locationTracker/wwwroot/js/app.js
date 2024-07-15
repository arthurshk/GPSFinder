document.addEventListener('DOMContentLoaded', function () {
    const getLocationBtn = document.getElementById('getLocationBtn');
    const locationDisplay = document.getElementById('location');
    const mapElement = document.getElementById('map');
    let map;
    let marker;
    let watchId;

    function initMap(lat, lon) {
        let location = { lat: lat, lng: lon };
        map = new google.maps.Map(mapElement, {
            center: location,
            zoom: 15
        });
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    function updateMap(lat, lon) {
        let location = { lat: lat, lng: lon };
        map.setCenter(location);
        marker.setPosition(location);
    }

    getLocationBtn.addEventListener('click', function () {
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(showPosition, showError);
        } else {
            locationDisplay.textContent = "Geolocation is not supported by this browser.";
        }
    });

    function showPosition(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        locationDisplay.innerHTML = 'Latitude: ' + lat + '<br>Longitude: ' + lon;

        if (!map) {
            initMap(lat, lon);
        } else {
            updateMap(lat, lon);
        }

        fetch('/Home/SaveLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latitude: lat, longitude: lon })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                locationDisplay.textContent = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                locationDisplay.textContent = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                locationDisplay.textContent = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                locationDisplay.textContent = "An unknown error occurred.";
                break;
        }
    }

    function stopTracking() {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
            locationDisplay.innerHTML = ""; 
        }
    }
    const stopTrackingBtn = document.createElement('button');
    stopTrackingBtn.textContent = 'Stop Tracking';
    document.body.appendChild(stopTrackingBtn);
    stopTrackingBtn.addEventListener('click', stopTracking);
});
