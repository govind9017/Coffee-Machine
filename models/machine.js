const Inventory = require('./inventory');
const Beverage = require('./beverage');

class Machine {
  constructor(input) {
    const { outlets = {}, total_items_quantity = {}, beverages = {} } = input && input.machine;
    this.outlets = outlets.count_n;
    this.beverage = [];
    this.inventory = new Inventory();

    //add inventory of all the ingredients
    Object.keys(total_items_quantity).forEach((ingredient) => {
      this.inventory.addInventory(ingredient, total_items_quantity[ingredient]);
    });
    // create beverage instance and store the array of beverage objects
    Object.keys(beverages).forEach((name) => {
      this.beverage.push(new Beverage(name, beverages[name]));
    });
  }

  /**
   * Process machine to get beverage creation status
   * @return Object containing info about each beverage creation possibility
   */
  async process() {
    try {
      const totalBeverage = this.beverage && this.beverage.length;
      if (!totalBeverage) {
        console.log('No beverage passed');
        return [];
      }
      let result = [];
      let currIndex = 0;
      while (currIndex < totalBeverage) {
        const promises = [];
        const maxIndex = Math.min(currIndex + this.outlets - 1, totalBeverage - 1);
        //process beverages parallely based on outlet count
        while (currIndex <= maxIndex) {
          // promises.push(this.inventory.checkAndUpdateInventory(this.beverage[currIndex]));
          promises.push(this.processBeverage(this.beverage[currIndex]));
          currIndex++;
        }
        //add the proccedd beverage response in result
        result = result.concat(await Promise.all(promises));
      }
      return result;
    } catch (err) {
      console.log('Error in processing machine output');
      throw err;
    }
  }

  /**
   * Check and prepeare the bverage if inventory is available
   * @param beverage beverage object that needs to be prepared
   * @return Beverage preparation status
   */
  async processBeverage(beverage) {
    const ingredients = beverage.getIngredients();
    const beverageName = beverage.getName();
    //check if required ingredients are available
    const inventoryStatus = this.inventory.areIngredientsAvailable(beverageName, ingredients) || {};
    if (!inventoryStatus || !inventoryStatus.status) {
      return inventoryStatus.reason || `${beverageName} is not prepared`;
    }
    this.inventory.updateInventory(ingredients);
    return `${beverageName} is prepared`;
  }
}

module.exports = Machine;
