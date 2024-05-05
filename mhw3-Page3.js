function onJson(json) {
    console.log('JSON ricevuto');
    console.log(json);
    articles = json.articles;

    const library = document.querySelector('#news-view');


    for (i = 0; i < articles.length; i++) {

        if (articles[i].source.name === 'Affaritaliani.it')
            continue

        let verify = false;
        for (k = 0; k < i; k++) {
            if (articles[i].title === articles[k].title || articles[i].image === articles[k].image)
                verify = true;
        }
        if (verify == true) continue;

        const article_data = articles[i];
        title = article_data.title;
        description = article_data.description;
        image = article_data.image;
        source_name = article_data.source.name;
        source_url = article_data.url;


        const news = document.createElement('div');
        news.classList.add('news');
        const img_news = document.createElement('img');
        img_news.src = image;
        const title_news = document.createElement('h1');
        title_news.textContent = title;
        const description_news = document.createElement('span');
        description_news.textContent = description;
        const source_name_news = document.createElement('span');
        source_name_news.textContent = source_name;

        const source_button = document.createElement('a');
        source_button.textContent = "vai all'articolo";
        source_button.href = source_url;
        source_button.classList.add('source_button');


        news.appendChild(source_name_news);
        news.appendChild(title_news);
        news.appendChild(description_news);
        news.appendChild(img_news);
        news.appendChild(source_button);

        library.appendChild(news);

    }


}

function onError(error) {
    console.log('Error: ' + error);
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

const api_key = 'f08dfb8f2099db5d02e1cad89ce9bbb4';

base_url = 'https://gnews.io/api/v4/';
endpoint = 'search?';
parameters = 'q=wwf NOT inter&lang=it&apikey=' + api_key;
url = base_url + endpoint + parameters;
console.log(url);
fetch(url).then(onResponse, onError).then(onJson);
