// fetch
export async function getSprite(species) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${species}`);
    
    if (!response.ok) {
        throw new Error("Could not fetch");
    }
    
    const data = await response.json();
    
    return data.sprites.front_default; 
    
  } catch (error) {
    console.error(error);
  }
}

// Pokemon super/parent class
class Pokemon {
  constructor(name) {
    this.name = name;
    this.hunger = 100;
    this.mood = 100;
    this.energy = 100;
    this.isAlive = true;

    // Singleton Pattern
    if (Pokemon.instance) {
      return Pokemon.instance;
    }
    Pokemon.instance = this;

  }

  // getters and setters
  get getSpecies() {
    return this.species;
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = this.name;
  }

  // action methods
  eat() {
    console.log(`${this.name} is eating.`);
  }

  play() {
    console.log(`${this.name} is playing.`);
  }

  sleep() {
    console.log(`${this.name} is sleeping.`);
  }

  getEnergy() {
    return this.energy;
  }

  isFainted() {
    // ternary
    return (this.hunger === 0 &&
            this.mood === 0 &&
            this.energy === 0) ?
    true : false;
  }
}

// Pokemon classes
export class Treecko extends Pokemon {
  constructor(name) {
      super(name);
      this.species = "Treecko"
  }
}

export class Mudkip extends Pokemon {
  constructor(name) {
      super(name);
      this.species = "Mudkip"
  }
}

export class Torchic extends Pokemon {
  constructor(name) {
      super(name);
      this.species = "Torchic";
  }
}