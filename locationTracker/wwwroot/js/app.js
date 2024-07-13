document.addEventListener('DOMContentLoaded', () => {
    const getLocationBtn = document.getElementById('getLocationBtn');
    const locationDisplay = document.getElementById('location');

    getLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            locationDisplay.textContent = "Geolocation is not supported by this browser.";
        }
    });

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        locationDisplay.innerHTML = `Latitude: ${lat} <br>Longitude: ${lon}`;

        fetch('/Home/SaveLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latitude: lat, longitude: lon })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
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
});
