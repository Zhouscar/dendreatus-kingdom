import { ItemType } from "../items/types";

export type CraftableRecipe = {
    itemType1: ItemType;
    itemType2: ItemType;
    itemType3: ItemType;
};

export const CRAFTABLE_RECIPES: ReadonlyMap<ItemType, CraftableRecipe> = new Map([
    [
        "spikeball",
        {
            itemType1: "scrap_metal",
            itemType2: "rope",
            itemType3: "nails",
        },
    ],
    [
        "scrap_blade",
        {
            itemType1: "scrap_metal",
            itemType2: "rope",
            itemType3: "sap",
        },
    ],
]);

export function getItemTypeFromCraftingRecipe(recipe: CraftableRecipe): ItemType | undefined {
    const recipeSet = new Set([recipe.itemType1, recipe.itemType2, recipe.itemType3]);

    let itemType: ItemType | undefined = undefined;

    CRAFTABLE_RECIPES.forEach((craftableRecipe, craftableItemType) => {
        if (itemType !== undefined) return;
        if (
            recipeSet.has(craftableRecipe.itemType1) &&
            recipeSet.has(craftableRecipe.itemType2) &&
            recipeSet.has(craftableRecipe.itemType3)
        ) {
            itemType = craftableItemType;
        }
    });

    return itemType;
}
