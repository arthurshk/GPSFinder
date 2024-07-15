const { JSDOM } = require('jsdom');
const { initMap, showError } = require('../js/app');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = {
    userAgent: 'node.js',
};
global.google = {
    maps: {
        Map: jest.fn(() => ({
            setCenter: jest.fn(),
            setZoom: jest.fn(),
        })),
        Marker: jest.fn(),
    },
};

test('initMap should return a map object', () => {
    const mockElement = document.createElement('div');
    const map = initMap(40.7128, -74.0060);

    expect(map).toBeDefined();
    expect(map instanceof google.maps.Map).toBe(true);
});

test('showError should return correct error messages', () => {
    const permissionDeniedError = { code: 1 };
    const positionUnavailableError = { code: 2 };
    const timeoutError = { code: 3 };
    const unknownError = { code: 0 };

    expect(showError(permissionDeniedError)).toBe("User denied the request for Geolocation.");
    expect(showError(positionUnavailableError)).toBe("Location information is unavailable.");
    expect(showError(timeoutError)).toBe("The request to get user location timed out.");
    expect(showError(unknownError)).toBe("An unspecified error occurred.");
});
