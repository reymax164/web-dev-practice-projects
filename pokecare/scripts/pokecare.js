import {Treecko, Mudkip, Torchic} from './pokemon.js';
import PokeAPI from './pokeapi.js';

// html elements
const playBtn = document.getElementById('play-btn');
const closeModal = document.getElementById('close-modal');
const background = document.getElementById('transparent-background');
const choiceModal = document.getElementById('choices-modal');
const choices = document.querySelectorAll('.choices');

const api = new PokeAPI();

// fetch sprites
choices[0].src = await api.getSprite(Treecko.getSpecies);
choices[1].src = await api.getSprite(Torchic.getSpecies);
choices[2].src = await api.getSprite(Mudkip.getSpecies);

playBtn.addEventListener('click', () => {
    background.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    background.style.display = 'none';
})

// choice
let pokemon, choice;
choices[0].addEventListener('click', () => {
    choice = 0;
    pokemon = new Treecko("Butiki");
    choiceModal.style.display = "none";
});
choices[1].addEventListener('click', () => {
    choice = 1;
    pokemon = new Torchic("Kwek-kwek");
    choiceModal.style.display = "none";
});
choices[2].addEventListener('click', () => {
    choice = 2;
    pokemon = new Mudkip("Butete");
    choiceModal.style.display = "none";
});

