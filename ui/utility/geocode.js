import Geocode from "react-geocode";

export function geocodeSettings(address, setRestaurants) {
    const API_KEY = process.env.REACT_APP_GEOCODE_API
    Geocode.setApiKey(API_KEY);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    Geocode.fromAddress(address).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
//            fetch('http://localhost:8080/addGeohash', {
//              method: 'POST',
//              mode: 'cors',
//              headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//              },
//              body: JSON.stringify({
//                lat: lat,
//                lng: lng
//              }),
//            }).then((res) => res.json()).then(response => {
//                console.log("aaa",response);
//                setRestaurants(response);
//                return response;
//            });
            console.log(lat, lng);
        },
        (error) => {
            console.error(error);
        }
    );
}