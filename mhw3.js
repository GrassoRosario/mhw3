/* DROPBOX */

function dropboxReveal(event) {
    const dropboxHidden = document.querySelector('#dropbox-hidden');
    dropboxHidden.classList.remove('hidden');

    const plus = document.querySelector('#dropbox a.dropbox-items .material-symbols-outlined');  // individua il plus presente nel primo tasto
    plus.textContent = "remove"; // lo sostituisce con un simbolo simile al meno sfruttando il modo in cui opera google icons
}

function dropboxUnReveal(event) {
    const dropboxHidden = document.querySelector('#dropbox-hidden');
    dropboxHidden.classList.add('hidden');

    const minus = document.querySelector('#dropbox a.dropbox-items .material-symbols-outlined');
    minus.textContent = "add";
}


const dropboxFirstItem = document.querySelector('#dropbox a.dropbox-items');
dropboxFirstItem.addEventListener('mouseover', dropboxReveal);


const dropboxHidden = document.querySelector('#dropbox-hidden');
dropboxHidden.addEventListener('mouseleave', dropboxUnReveal);


dropboxHidden.addEventListener('mouseover', dropboxReveal);
dropboxFirstItem.addEventListener('mouseleave', dropboxUnReveal);   // Quando il cursore lascia il primo tasto il dropbox-hidden: 1) scompare se il cursore non va su di esso 2) rimane se il cursore va su di esso








/* HEADER DINAMICO MOBILE */

const ListaSfondi = [
    'immagini/backgorund-image-elephant-1-1.jpg',
    'immagini/tigre_mobile.jpg.webp',
]


function scrolling(event) {
    const img = document.querySelector('img#sfondo-mobile');
    if (img.dataset.id === "elephant") {
        img.src = ListaSfondi[1];
        img.dataset.id = "tiger"

        // cambiamento del testo

        const ListTitolo = document.querySelectorAll('#corpo_header h1')
        ListTitolo[0].textContent = 'DIVENTA DONATORE REGOLARE';
        ListTitolo[1].textContent = '';

        const ListSottoTitolo = document.querySelectorAll('#corpo_header p')
        ListSottoTitolo[1].textContent = 'Rimani al fianco degli animali in pericolo, ogni giorno';


        const new_tasto = document.createElement('a');
        new_tasto.classList.add('tasto_header');
        new_tasto.textContent = 'DONA ORA';
        const container = document.querySelector('#corpo_header');
        container.appendChild(new_tasto);

    }

    else {
        img.src = ListaSfondi[0];
        img.dataset.id = "elephant"

        // cambiamento del testo

        const ListTitolo = document.querySelectorAll('#corpo_header h1')
        ListTitolo[0].textContent = 'ADOTTA UNA SPECIE ';
        ListTitolo[1].textContent = 'A RISCHIO ';

        const ListSottoTitolo = document.querySelectorAll('#corpo_header p')
        ListSottoTitolo[1].textContent = 'Circa un milione di specie animali e a rischio estinzione: un numero drammatico e preoccupante se pensiamo che il nostro benessere dipende soprattutto da loro.Abbiamo bisogno di te per proteggere questa straordinaria fonte di vita.';
        const new_tasto = document.querySelector('#corpo_header a.tasto_header');
        new_tasto.remove();
    }
}


const arrow = document.querySelectorAll('#arrow-mobile span');
for (const arrows of arrow) {
    arrows.addEventListener('click', scrolling);
}



/*PARTE 3: MENU FOOTER MOBILE*/

function fexpand(event) {

    const expand = event.currentTarget;
    const blocco = expand.parentNode.parentNode;
    const contenuto = blocco.querySelector('.contenuto');

    if (expand.textContent === 'expand_more') {

        // Chiudere tutti i sottomenu già aperti 
        const ListContenuto = document.querySelectorAll('.contenuto');
        for (contenuti of ListContenuto) {
            contenuti.classList.add('hidden-mobile');
        }
        for (const expand of ListExpand) {
            expand.textContent = 'expand_more';
        }

        // Aprire il sottomenu di interesse
        expand.textContent = 'expand_less';
        contenuto.classList.remove('hidden-mobile');

    }
    else {
        expand.textContent = 'expand_more';
        contenuto.classList.add('hidden-mobile');

    }

}

const ListExpand = document.querySelectorAll('.flex-expand  .material-symbols-outlined')
for (const expand of ListExpand) {
    expand.addEventListener('click', fexpand);
}


