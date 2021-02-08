const search = document.getElementById('search');
const matchList = document.getElementById('matchList');

const searchStates = async searchText => {
    // recuperer les data de l'Api
    const data = await fetch('https://restcountries.eu/rest/v2/all');
    const states = await data.json();

    // verifier les match entre valeur input et les nom des payes
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.alpha2Code.match(regex); 
      });
    // si le tableau est vide n'affiche rien 
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML ='';
    }
    // appel function outputHtml
    outputHtml(matches);
};
// show result in HTML 
const outputHtml = (matches) => {
    if (matches.length > 0) {
        const html = matches.map(match =>`
            <div class="card card-body">
            <a href="show.html?name=${match.name}">
                <h4><img class="flag  " src="${match.flag}">
                        ${match.translations.fr}(${match.alpha2Code}) 
                    <span class="text-primary">
                        ${match.capital}
                    </span>
                </h4>
                <small>
                    <i class="fas fa-map-marker-alt "></i>
                    Lat : ${match.latlng[0]} | Long : ${match.latlng[1]}
                </small>
                </a>
            </div>
            `
        ).join('');
        matchList.innerHTML = html;
    }
};
search.addEventListener('input', () => searchStates(search.value));

