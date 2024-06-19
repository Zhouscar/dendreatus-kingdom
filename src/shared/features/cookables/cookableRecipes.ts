import { ItemType } from "../items/types";

export type CookableRecipe = {
    itemType1: ItemType;
    itemType2: ItemType;
    itemType3: ItemType;
};

export const COOKABLE_RECIPES: ReadonlyMap<ItemType, CookableRecipe> = new Map([
    [
        "mushroom_soup",
        {
            itemType1: "mushroom",
            itemType2: "egg",
            itemType3: "flour",
        },
    ],
]);

export function getItemTypeFromCookingRecipe(recipe: CookableRecipe): ItemType | undefined {
    const recipeSet = new Set([recipe.itemType1, recipe.itemType2, recipe.itemType3]);

    let itemType: ItemType | undefined = undefined;

    COOKABLE_RECIPES.forEach((cookableRecipe, cookableItemType) => {
        if (itemType !== undefined) return;
        if (
            recipeSet.has(cookableRecipe.itemType1) &&
            recipeSet.has(cookableRecipe.itemType2) &&
            recipeSet.has(cookableRecipe.itemType3)
        ) {
            itemType = cookableItemType;
        }
    });

    return itemType;
}
