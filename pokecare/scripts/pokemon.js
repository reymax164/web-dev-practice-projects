// Pokemon super/parent class
export default class Pokemon {
  constructor(name, species) {
    this.name = name;
    this.hunger = 100;
    this.mood = 100;
    this.energy = 100;
    this.species = species;

    if(Pokemon.instance) {
      return Pokemon.instance;
    }
    Pokemon.instance = this;

    console.log(this);
    
  }

  static deleleInstance() {
    Pokemon.instance = null;
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = this.name;
  }

  // action methods
 feed() {
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
// export class Treecko extends Pokemon {
//   constructor(name) {
//       super(name);
//       // console.log(this);  
//   }
// }

// export class Mudkip extends Pokemon {
//   constructor(name) {
//       super(name);
//       // console.log(this);
//   }
// }

// export class Torchic extends Pokemon {
//   constructor(name) {
//       super(name);
//       // console.log(this);
//   }
// }