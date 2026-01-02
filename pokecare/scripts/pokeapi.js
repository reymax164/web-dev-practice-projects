export default class PokeAPI {
  constructor(y) {
    // Singleton Pattern
    if (PokeAPI.instance) {
      return PokeAPI.instance;
    }
    PokeAPI.instance = this;
    
    // base URL
    this.baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  }

  // getSprite
  async getSprite(species) {
    try {
      const response = await fetch(`${this.baseUrl}${species}`);

      if (!response.ok) {
        throw new Error("Could not fetch");
      }

      const data = await response.json();

      return data.sprites.front_default;

    } catch (error) {
      console.error(error);
    }
  }
}