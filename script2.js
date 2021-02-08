const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);

const name = urlParams.get('name');
getState(name);

async function getState(name) {
    const data = await fetch('https://restcountries.eu/rest/v2/name/' + name);
    const state = await data.json();
    document.getElementById('country-detals').innerHTML = `${state[0].name} -- ${state[0].capital}`;
    initMap(state[0].latlng[0], state[0].latlng[1])
}



function initMap(lattitude, lngitude) {
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lattitude, lng: lngitude },
        zoom: 6,
    });
    console.log(map.zoom)
}


