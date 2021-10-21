class Inventory {
  constructor(ingredient, quantity) {
    this.inventory = new Map();
  }

  getInventory() {
    return this.inventory;
  }

  /**
   * To add the inventory of a particular ingredient
   * @param ingredient Ingredient name for which inventory needs to be added
   * @param quantity Quantity of ingredient avaialble in inventory
   */
  addInventory(ingredient, quantity) {
    if (quantity < 0) {
      console.log("Inventory can't be negative for ingredient ::", ingredient);
      return;
    }
    this.inventory.set(ingredient, quantity);
  }

  areIngredientsAvailable(beverageName, ingredients) {
    //check if all ingredients are available in inventory
    for (const ingredient in ingredients) {
      if (!this.inventory.get(ingredient)) {
        return {
          status: false,
          reason: `${beverageName} cannot be prepared because ${ingredient} is not available`,
        };
      }
    }

    //check if all ingredients are in sufficient quantity required
    for (const ingredient in ingredients) {
      if (this.inventory.get(ingredient) < ingredients[ingredient]) {
        return {
          status: false,
          reason: `${beverageName} cannot be prepared because item ${ingredient} is not sufficient`,
        };
      }
    }
    // return true as inventory is available
    return { status: true };
  }

  updateInventory(ingredients) {
    // deduct the required quantity of the ingredients mentioned in the params
    for (const ingredient in ingredients) {
      const updatedInventory = this.inventory.get(ingredient) - ingredients[ingredient];
      if (updatedInventory < 0) {
        console.log("Inventory can't be deducted as ingredient is not sufficient", ingredient);
        throw new Error("Inventory can't be deducted as ingredient is not sufficient");
      }
      this.inventory.set(ingredient, updatedInventory);
    }
    return true;
  }
}

module.exports = Inventory;
