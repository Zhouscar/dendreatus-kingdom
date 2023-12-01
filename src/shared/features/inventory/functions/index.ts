import inventoryGetters from "./getters";
import inventoryImmutSetters from "./immutSetters";
import inventorySpaces from "./spaces";

const inventoryFunctions = { ...inventoryGetters, ...inventorySpaces, ...inventoryImmutSetters };

export = inventoryFunctions;
