function randomizer(minimum, maximum) {
  return Math.floor(Math.random() * ((maximum - minimum) + 1)) + minimum;
}

// tracks the stat value before it changes
let previousMood;
let previousHunger;
let previousEnergy;

let energyChange;
let moodChange;
let hungerChange;

let details;

export default class Pokemon {
  constructor(name, species) {
    this.name = name;
    this.mood = 75;
    this.hunger = 75;
    this.energy = 75;
    this.species = species;

    if(Pokemon.instance) {
      return Pokemon.instance;
    }
    Pokemon.instance = this;

    // console.log(this);   
  }

  static deleteInstance() {
    Pokemon.instance = null;
  }

  // getters
  get getName() {
    return this.name;
  }

  get getMood() {
    return this.mood;
  }

  get getHunger() {
    return this.hunger;
  }

  get getEnergy() {
    return this.energy;
  }

  // setters
  set setName(name) {
    this.name = name;
  }

  setMood(amount) {
    this.mood += amount;
  }

  setHunger(amount) {
    this.hunger += amount;
  }

  setEnergy(amount) {
    this.energy += amount;
  }

  // stat increasers
  increaseMood(amount) {
    this.mood += amount;
    return this.mood;
  }

  increaseHunger(amount) {
    this.hunger += amount;
    return this.hunger;
  }

  increaseEnergy(amount) {
    this.energy += amount
    return this.energy;
  }

  // stat decreasers
  decreaseMood(amount) {
    this.mood -= amount;
    return this.mood;
  }

  decreaseHunger(amount) {
    this.hunger -= amount;
    return this.hunger;
  }

  decreaseEnergy(amount) {
    this.energy -= amount
    return this.energy;
  }

  limitCheck() {

    if(this.mood > 100) this.mood = 100;
    if(this.hunger > 100) this.hunger = 100;
    if(this.energy > 100) this.energy = 100;
    if(this.mood < 0) this.mood = 0;
    if(this.hunger < 0) this.hunger = 0;
    if(this.energy < 0 && this.energy > -149) this.energy = 0;

    if(this.hunger === 0) {
      details = `${this.name} is hungry.`;
      this.decreaseMood(randomizer(5, 10));
    }
    if(this.mood < 0) this.mood = 0;

    if(this.mood === 0) {
      details = `${this.name} is bored.`;
      this.decreaseEnergy(randomizer(10, 15));
    }
    if(this.energy < 0) this.energy = 0;

    if(this.energy < -130) {
      details = `${this.name} crashed out of tiredness.`;
      this.sleep();
    }

    moodChange = this.mood - previousMood;
    hungerChange = this.hunger - previousHunger;
    energyChange = this.energy - previousEnergy;
  }

  logStatChanges() {
    console.log(`Mood ${moodChange >= 0? "+" : ""}${moodChange}`);
    console.log(`Hunger ${hungerChange >= 0? "+" : ""}${hungerChange}`);
    console.log(`Energy ${energyChange >= 0? "+" : ""}${energyChange}`);
  }

  logUpdatedStats() {
    console.log(`Hunger: ${this.hunger}`);
    console.log(`Mood: ${this.mood}`);
    console.log(`Energy: ${this.energy}`);
  }

  static getStatChanges() {
    const statChanges = new Array();
    statChanges.push(details);
    statChanges.push(`Mood ${moodChange >= 0? "+" : " "}${moodChange}`);
    statChanges.push(`Hunger ${hungerChange >= 0? "+" : " "}${hungerChange}`);
    statChanges.push(`Energy ${energyChange >= 0? "+" : " "}${energyChange}`);

    return statChanges;
  }

  // activities functions
  // ===== feed =====
  feed() {
    if(this.hunger >= 100) {
      details = `${this.name} is full`;
      return; 
    }

    if(this.mood <= 30) {
      let eatOutcome = randomizer(1, 5);

      if(eatOutcome > 1) {
        details = `${this.name} is not in mood to eat.`;
        return;
      }
    }
    
    previousMood = this.mood;
    previousHunger = this.hunger;
    previousEnergy = this.energy;

    const outcome = randomizer(1, 3);

    // good
    if (outcome === 1) {
      this.increaseHunger(randomizer(60, 80));
      this.increaseMood(randomizer(31, 50)); 
      details = `${this.name} ate a lot.`;
    }
    // okay
    else if (outcome === 2) {
      this.increaseHunger(randomizer(30, 59));
      this.increaseMood(randomizer(10, 30)); 
      details = `${this.name} ate.`;
    }
    // bad
    else {
      this.increaseHunger(randomizer(10, 29));
      this.decreaseMood(randomizer(30, 50));
      details = `${this.name} didn't liked the food.`;
    }
    
    // over ate
    if(this.hunger >= 125) {
      details = `${this.name} over ate.`;
      this.decreaseMood(randomizer(50, 75));
    }

    this.increaseEnergy(randomizer(10, 30));

    this.limitCheck();
    // this.logStatChanges();
  }

  // ===== play =====
  play() {
    if(this.energy <= 0) {
      details = `${this.name} has no energy to play.`;
      this.decreaseMood(randomizer(15, 30));
      return;
    }

    previousMood = this.mood;
    previousHunger = this.hunger;
    previousEnergy = this.energy;

    const outcome = randomizer(1, 3);

    if (outcome === 1) {
      details = `${this.name} enjoyed playing.`;
      this.increaseMood(randomizer(60, 80));
      this.decreaseEnergy(randomizer(40, 90));
    }
    else if (outcome === 2) {
      details = `${this.name} played.`;
      this.increaseMood(randomizer(30, 59)); 
      this.decreaseEnergy(randomizer(50, 75));
    }
    else {
      details = `${this.name} didn't enjoy playing.`;
      this.increaseMood(randomizer(10, 29));
      this.decreaseEnergy(50, 80);
    }

    this.decreaseHunger(randomizer(15, 30));

    this.limitCheck();
    // this.logStatChanges();

  }

  // ===== sleep =====
  sleep() {
    if(this.energy === 100) {
      details = `${this.name} is full of energy.`;
      return;
    }

    previousMood = this.mood;
    previousHunger = this.hunger;
    previousEnergy = this.energy;

    const outcome = randomizer(1, 3);

    if (outcome === 1) {
      details = `${this.name} had a long sleep.`;
      this.increaseEnergy(randomizer(60, 80)); 
      this.increaseMood(randomizer(10, 30));
      this.decreaseHunger(randomizer(35, 55));
    }
    else if (outcome === 2) {
      details = `${this.name} slept.`;
      this.increaseEnergy(randomizer(30, 59));
      this.increaseMood(randomizer(5, 15));
      this.decreaseHunger(randomizer(20, 35));
    }
    else {
      this.increaseEnergy(randomizer(10, 29));
      this.decreaseMood(randomizer(20, 40));
      this.decreaseHunger(randomizer(20, 30));
      details = `${this.name} didn't have a good sleep.`;
    }


    // over slept
    if(this.energy >= 110) {
      details = `${this.name} over slept.`;
      this.decreaseMood(randomizer(10, 20));
    }

    this.limitCheck();
    // this.logStatChanges();
  }

  get isFainted() {
    return (this.hunger === 0 &&
            this.mood === 0 &&
            this.energy === 0) ?
    true : false;
  }
}