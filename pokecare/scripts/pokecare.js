import Pokemon from './pokemon.js';
import PokeAPI from './pokeapi.js';
import HighScore from './high-score.js';

// html elements
const playBtn = document.getElementById('play-btn');
const openTutoriialBtn = document.getElementById('tutorial-btn');
const tutorialContainer = document.getElementById('tutorial-container');
const background = document.getElementById('transparent-background');
const backgroundMusic = document.getElementById('bg-music');

// choices
const choiceModal = document.getElementById('choices-modal');
const choices = document.querySelectorAll('.choices');

// name input
const inputDiv = document.getElementById('input-div');
const nameTextbox = document.getElementById('name-textbox');
const confirmNameBtn = document.getElementById('confirm-name-btn');

// game
const game = document.getElementById('game-container');
const gamePokemon = document.getElementById('game-pokemon');
const pokemonName = document.getElementById('pokemon-name');

const onScreenScore = document.getElementById('on-screen-score');

const pokemonCry = document.getElementById('pokemon-cry');

const onScreenLog = document.getElementById('on-screen-log');
const outcomeLog = document.getElementById('outcome-log');
const moodLog = document.getElementById('mood-log');
const hungerLog = document.getElementById('hunger-log');
const energyLog = document.getElementById('energy-log');
const statChanges = Pokemon.getStatChanges();

// lose screen
const loseScreen = document.getElementById('lose-screen');
const loseScreenMessage = document.getElementById('lose-screen-message');
const loseScreenScore = document.getElementById('lose-screen-score');
const loseScreenHighScore = document.getElementById('lose-screen-high-score');

// game buttons
const gameButtons = document.querySelectorAll('.game-buttons')
const playGameButton = document.getElementById('game-play-btn');
const feedGameButton = document.getElementById('game-feed-btn');
const sleepGameButton = document.getElementById('game-sleep-btn');

// On-screen stats
const onScreenMood = document.getElementById('mood-p');
const onScreenHunger = document.getElementById('hunger-p');
const onScreenEnergy = document.getElementById('energy-p');

// variables
let pokemon = null, choice = null, name = null, cooldownTimer = null, degradeIntervalTimer;
let score = 0, pointsCounter = null;
backgroundMusic.volume = 0.5;

// close buttons declarations
const closeBtns = document.querySelectorAll('.close-btn');
const closeChoices = closeBtns[0];
const closeNameInput = closeBtns[1];
const closeGame = closeBtns[2];
const closeLoseScreen = closeBtns[3];
const closeTutorial = closeBtns[4];

// reset
function reset() {
  // logs score
  // console.log(`Points: ${score}`);
  clearInterval(degradeIntervalTimer);
  clearInterval(pointsCounter);

  score = 0;
  loseScreen.style.display = "none";
  onScreenScore.textContent = "Score: 0";
  background.style.display = 'none';
  Pokemon.deleteInstance();
  pokemon = null;
  name = null;
  choice = null;
  cooldownTimer = null;
  pointsCounter = null;
  degradeIntervalTimer = null;
  
  // clear game logs
  onScreenLog.classList.remove('fade-message');
  outcomeLog.textContent = "";
  moodLog.textContent = "";
  hungerLog.textContent = "";
  energyLog.textContent = "";

  // game pokemon
  gamePokemon.src = "";
  pokemonCry.src = "";

  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

// close events
closeChoices.addEventListener('click', () => {
    background.style.display = 'none';
});

closeNameInput.addEventListener('click', () => {
    inputDiv.style.display = 'none';
    choiceModal.style.display = 'flex';
});

closeGame.addEventListener('click', () => {
  game.style.display = "none";
    reset();
});

closeLoseScreen.addEventListener('click', () => {
    reset();
});

// randomizer
function randomizer(minimum, maximum) {
  return Math.floor(Math.random() * ((maximum - minimum) + 1)) + minimum;
}

// fetch/api
const api = new PokeAPI();

async function fetchPokemonList() {
  try {
    const reponse = await fetch("./pokemon_list.json");

    if(!reponse.ok) {
      throw new Error("Could not fetch");
    }

    const data = await reponse.json();
    return data;
  }
  catch(error) {
    console.error(error);
  }
}

// sprite in choices menu
async function setSprites() {
  const pokemonList = await fetchPokemonList()

  const spritePromises = pokemonList.map(async (pokemon, index) => {  
    const spriteUrl = await api.getSprite(pokemon.species);
    choices[index].src = spriteUrl;
  });

  await Promise.all(spritePromises);
}

// sprite in-game
async function setGameSprite(choice) {
  gamePokemon.src = await api.getSprite(choice);
}

// pokemon cry in game
async function setCry(species) {
  pokemonCry.src = await api.getCry(species);
}

// ===== main memu =====
// Play
playBtn.addEventListener('click', () => {
    background.style.display = 'block';
    choiceModal.style.display = 'flex';
});

function closeChoices_OpenNameInput() {
  choiceModal.style.display = "none";
  inputDiv.style.display = 'block';
}

function updateOnScreenStats() {
  onScreenMood.textContent = `Mood: ${pokemon.getMood}`;
  onScreenHunger.textContent = `Hunger: ${pokemon.getHunger}`;
  onScreenEnergy.textContent = `Energy: ${pokemon.getEnergy}`;
}

// isFainted function
function isFainted() {
  if(pokemon.isFainted) {
    clearInterval(degradeIntervalTimer);
    clearInterval(pointsCounter);

    gamePokemon.src = "";
    game.style.display = 'none';
    loseScreenMessage.textContent = `${pokemon.getName} fainted. You lose.`;
    loseScreenScore.textContent = `Score: ${score}`;

    // highscore handler
    if (HighScoreHandler.isNewHighScore(score)) {
      HighScoreHandler.setHighScore(score);
    }

    loseScreenHighScore.textContent = `High Score: ${HighScoreHandler.getHighScore()}`;
    loseScreen.style.display = "block";
  }
}

// stats degrader
function startStatDegrade() {
  if(!degradeIntervalTimer) {
    degradeIntervalTimer = setInterval(() => {
      isMaxStats();
      pokemon.setMood(randomizer(-3, -1));
      pokemon.setHunger(randomizer(-3, -1));
      pokemon.setEnergy(randomizer(-3, -1));
      pokemon.limitCheck();
      updateOnScreenStats();

      isFainted()
    }, randomizer(1000, 2500))
  }
}

// point based on time
function startPointsCounter() {
  if(!pointsCounter) {
    pointsCounter = setInterval(() => {
      score++;
      onScreenScore.textContent = `Score: ${score}`;
    }, 1000);
  }
};

// buttons cooldown
function buttonCooldown() {
  if (cooldownTimer) return;

  gameButtons.forEach(button => {
    button.classList.add('buttons-cooldown');
  });

  cooldownTimer = setTimeout(() => {
    gameButtons.forEach(button => {
      button.classList.remove('buttons-cooldown');
  });

  cooldownTimer = null; 
  }, 3000);
}

// pokemon jump
function spriteJump() {
  gamePokemon.classList.add('jump');
  setTimeout(() => {
    gamePokemon.classList.remove('jump');
  }, 500);
}

// ========== game log ==========
function updateGameLogs() {
  const currentStats = Pokemon.getStatChanges();
  
  outcomeLog.textContent = currentStats[0];
  moodLog.textContent = currentStats[1];
  hungerLog.textContent = currentStats[2];
  energyLog.textContent = currentStats[3];

  // fade in fade out of logs in mobile
  onScreenLog.classList.remove('fade-message');

  void onScreenLog.offsetWidth; 

  onScreenLog.classList.add('fade-message');
}

// stats at 100
function isMaxStats() {
  let mood = pokemon.getMood;
  let hunger = pokemon.getHunger;
  let energy = pokemon.getEnergy;
  
  if(mood >= 100 && hunger >= 100 && energy >= 100) score += 100;
}

// ========== activities ==========
function gameButtonsFunction() {

  // ========== play ==========
  playGameButton.addEventListener('click', () => {
    pokemonCry.play();
    buttonCooldown();
    spriteJump();
    score += 10;
    pokemon.play();

    updateGameLogs();
    updateOnScreenStats();
    isFainted();
  });

  // ========== feed ==========
  feedGameButton.addEventListener('click', () => {
    pokemonCry.play();
    buttonCooldown();
    spriteJump();
    score += 10;
    pokemon.feed();
    
    updateGameLogs();
    updateOnScreenStats();
    isFainted();
  });

  // ========== sleep ==========
  sleepGameButton.addEventListener('click', () => {
    pokemonCry.play();
    buttonCooldown();
    spriteJump();
    score += 10;
    pokemon.sleep();
    
    updateGameLogs();
    updateOnScreenStats();
    isFainted();
  });
}

async function nameInputFunction() {
  const pokemonList = await fetchPokemonList();

  // choices
  choices[0].addEventListener('click', () => {
    choice = pokemonList[0].species;
    closeChoices_OpenNameInput();
  });

  choices[1].addEventListener('click', () => {
    choice = pokemonList[1].species;;
    closeChoices_OpenNameInput();
  });

  choices[2].addEventListener('click', () => {
    choice = pokemonList[2].species;;
    closeChoices_OpenNameInput();
  });

  // confirm button in name input
  confirmNameBtn.addEventListener('click', () => {
    // gets the input
    name = nameTextbox.value;
    // creates object based on choice and input
    if(pokemon === null) {
      if(choice === pokemonList[0].species) {
        if(name === "") name = pokemonList[0].species;
        pokemon = new Pokemon(name, pokemonList[0].species);
        setCry(pokemonList[0].species);
      }
      else if (choice === pokemonList[1].species) {
        if(name === "")  name = pokemonList[1].species;
        pokemon = new Pokemon(name, pokemonList[1].species)
        setCry(pokemonList[1].species);
      }
      else if (choice === pokemonList[2].species) {
        if(name === "")  name = pokemonList[2].species;
        pokemon = new Pokemon(name, pokemonList[2].species)
        setCry(pokemonList[2].species);
      }
      pokemonName.textContent = pokemon.getName;
      updateOnScreenStats();
    }

    nameTextbox.value = "";
    setGameSprite(choice);
    inputDiv.style.display = "none";

    game.style.display = "flex";
    backgroundMusic.play();

    startStatDegrade();
    startPointsCounter();
  });

  gameButtonsFunction();
}

setSprites();
nameInputFunction();

// ========== Tutorial ==========
openTutoriialBtn.addEventListener('click', () => {
  background.style.display = "block";
  tutorialContainer.style.display = "block";
});

closeTutorial.addEventListener('click', () => {
  tutorialContainer.style.display = "none";
  background.style.display = "none";
});