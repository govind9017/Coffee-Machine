// const helper = require("../helper/museumAttendance");
class Beverage {
  constructor(name, ingredients) {
    this.name = name;
    this.ingredients = ingredients;
  }

  getIngredients() {
    return this.ingredients;
  }
  getName() {
    return this.name;
  }
}

module.exports = Beverage;
