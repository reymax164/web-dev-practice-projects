export default class HighScoreHandler {
  static #STORAGE_KEY = 'high_score';

  static getHighScore() {
    try {
      const storedScore = localStorage.getItem(this.#STORAGE_KEY);

      if (storedScore === null) {
        return 0; 
      }
      
      return Number(storedScore);

    } catch (e) {
      return 0;
    }
  }

  static setHighScore(score) {
    try {
      const current = this.getHighScore();
      if (score > current) {
         localStorage.setItem(this.#STORAGE_KEY, score);
      }
    } catch (e) {
      console.warn('Storage not available:', e);
    }
  }

  static isNewHighScore(score) {
    const current = this.getHighScore();
    return score > current;
  }
}