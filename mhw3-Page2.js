function onPageResponse(response) {
    return response.json();
}

function onPageJson(json) {
    console.log(json);
    let pageid = null;
    const pages = json.query.pages;
    for (let key in pages) {
        if (typeof pages[key] === 'object' && 'pageid' in pages[key]) {

            pageid = pages[key].pageid;
        }
    }
    let exctract = json.query.pages[pageid].extract;
    exctract = exctract.replace(/=/g, "\n");

    const content = document.createElement('span');
    content.textContent = exctract;

    const pet_info = document.createElement('div');
    pet_info.classList.add('pet_info');
    pet_info.appendChild(content);

    const library = document.querySelector('#pet-article-view');
    library.appendChild(pet_info);

}

function onJson(json) {
    console.log(json);

    const library = document.querySelector('#pet-article-view');
    library.innerHTML = '';

    pet_data = json.pages[0]
    const title = pet_data.title;
    const id = pet_data.id;

    let img_url = 'http:' + pet_data.thumbnail.url;
    img_url = img_url.replace("/thumb/", "/");
    img_url = img_url.split("/60px")[0];

    const pet_info = document.createElement('div');
    pet_info.classList.add('pet_info');
    const img = document.createElement('img');
    img.src = img_url;
    const caption = document.createElement('span');
    caption.textContent = '\n' + title;

    pet_info.appendChild(img);
    pet_info.appendChild(caption);
    library.appendChild(pet_info);

    page_url = 'https://it.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&explaintext&redirects=1&titles=' + title;
    fetch(page_url).then(onPageResponse).then(onPageJson);

}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function search(event) {
    event.preventDefault();

    const pet_input = document.querySelector('#pet');
    const pet_value = encodeURIComponent(pet_input.value);

    console.log('Eseguo ricerca: ' + pet_value);

    // preparazione url
    language_code = 'it';
    base_url = 'https://api.wikimedia.org/core/v1/wikipedia/';
    endpoint = '/search/page';
    parameters = 'q=' + pet_value;
    url = base_url + language_code + endpoint + '?' + parameters;

    fetch(url,
        {
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        }
    ).then(onResponse).then(onJson);
}


function onTokenJson(json) {
    token = json.access_token;
}

function onTokenResponse(response) {
    if (!response.ok) {
        console.log('Risposta non valida');
        return null;
    }

    else
        return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
}

const client_id = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';
const client_secret = 'yyyyyyyyyyyyyyyyyyyyyyyy';

let token;

// Fetch per token di accesso - Oauth2 
fetch("https://meta.wikimedia.org/w/rest.php/oauth2/access_token",
    {
        method: "post",
        body: 'grant_type=client_credentials',
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }
).then(onTokenResponse, onError).then(onTokenJson);


// Gestione search
const form = document.querySelector('form');
form.addEventListener('submit', search);

const selectElem = document.querySelector('select');

selectElem.addEventListener('change', function () {
    const index = selectElem.selectedIndex;
    console.log('index selected: ' + index);
    console.log('option selected: ' + selectElem.options[index].value);


    // preparazione url
    language_code = 'it';
    base_url = 'https://api.wikimedia.org/core/v1/wikipedia/';
    endpoint = '/search/page';
    parameters = 'q=' + selectElem.options[index].value;
    url = base_url + language_code + endpoint + '?' + parameters;

    fetch(url,
        {
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        }
    ).then(onResponse).then(onJson);
})


