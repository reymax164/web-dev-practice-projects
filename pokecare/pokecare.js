import {Treecko, Mudkip, Torchic, getSprite} from '/pokecare/pokemon.js';

const playBtn = document.getElementById('play-btn');
const closeModal = document.getElementById('close-modal');
const choicesBack = document.getElementById('choices-background');
const choices = document.querySelectorAll('.choices');

playBtn.addEventListener('click', () => {
    choicesBack.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    choicesBack.style.display = 'none';
})

const kwek = new Torchic("Kwek-kwek");
// const butiki = new Treecko("Butiki");

choices[0].src = await getSprite("Treecko");
choices[1].src = await getSprite("Torchic");
choices[2].src = await getSprite("Mudkip");
