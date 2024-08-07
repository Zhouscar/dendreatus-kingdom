import withAssetPrefix from "shared/calculations/withAssetPrefix";

export interface ItemContext {
    readonly name: string;
    readonly stackSize: number;
    readonly image: string;
    readonly description: string;
}

const asItemContext = (context: ItemContext) => context;

export const ITEM_CONTEXTS = {
    stick: asItemContext({
        name: "Stick",
        stackSize: 30,
        image: withAssetPrefix("14942969504"),
        description:
            "Richard Paul Astley (born 6 February 1966) is an English singer who has been active in music for several decades",
    }),
    bigger_stick: asItemContext({
        name: "Bigger Stick",
        stackSize: 20,
        image: withAssetPrefix("14942969504"),
        description: "WHA",
    }),
    crucifix_dagger: asItemContext({
        name: "Crucifix Dagger",
        stackSize: 1,
        image: withAssetPrefix("16348933235"),
        description:
            "So the crucifix dagger is one of the weapons that could be used but I'm trying to figure out how players would even obtain these objects \nactually, scratch that.",
    }),
    mushroom_soup: asItemContext({
        name: "Mushroom Soup",
        stackSize: 1,
        image: withAssetPrefix("16349074550"),
        description: "This is the quality that you can't get in Pizzahut.",
    }),
    sap: asItemContext({
        name: "Sap",
        stackSize: 10,
        image: withAssetPrefix("16349184242"),
        description: "This stuff is really sticky...may come in handy for gluing stuff!",
    }),
    herbs: asItemContext({
        name: "Herbs",
        stackSize: 16,
        image: withAssetPrefix("17134075412"),
        description: "Could be used for a multitude of things..",
    }),
    humberbell: asItemContext({
        name: "Humberbell",
        stackSize: 1,
        image: withAssetPrefix("16348992642"),
        description: "I've never seen these before, can I eat them??",
    }),
    goya: asItemContext({
        name: "Goya",
        stackSize: 1,
        image: withAssetPrefix("16859686889"),
        description: "YUCK!",
    }),
    raw_pork: asItemContext({
        name: "Raw Pork",
        stackSize: 16,
        image: withAssetPrefix("17133968953"),
        description:
            "Glad this is still fresh, looking at the barrels this came from makes me sick...",
    }),
    bones: asItemContext({
        name: "Bones",
        stackSize: 16,
        image: withAssetPrefix("17134475493"),
        description: "I shouldn't have taken this from its place...",
    }),
    egg: asItemContext({
        name: "Egg",
        stackSize: 16,
        image: withAssetPrefix("17165290853"),
        description: "Who knows what this could hatch into.",
    }),
    flour: asItemContext({
        name: "Flour",
        stackSize: 16,
        image: withAssetPrefix("17165267270"),
        description: "Ah yes, this is totally flour...",
    }),
    mushroom: asItemContext({
        name: "Mushroom",
        stackSize: 16,
        image: withAssetPrefix("13033967093"),
        description: "Probably not poison?",
    }),
    scrap_metal: asItemContext({
        name: "Scrap Metal",
        stackSize: 16,
        image: withAssetPrefix("17165197728"),
        description: "Have to be resourceful in times of need.",
    }),
    rope: asItemContext({
        name: "Rope",
        stackSize: 16,
        image: withAssetPrefix("17134358548"),
        description: "It's somewhat covered in blood... who knows what things were tied up.",
    }),
    nails: asItemContext({
        name: "Nails",
        stackSize: 16,
        image: withAssetPrefix("17165310845"),
        description: "Need to be careful so it doesn't poke me.",
    }),
    scrap_blade: asItemContext({
        name: "Scrap Blade",
        stackSize: 1,
        image: withAssetPrefix("17837106969"),
        description:
            "From the ship ruins to...something useful I guess? You tried your best in making something useful to defend yourself. Good luck with that.",
    }),
    spikeball: asItemContext({
        name: "Spikeball",
        stackSize: 1,
        image: withAssetPrefix("17837113516"),
        description:
            "THATS MORE LIKE IT! Now your able to smash spikes into other survivors who are trying to steal your food!",
    }),
    survivor_lantern: asItemContext({
        name: "Survivor Lantern",
        stackSize: 1,
        image: withAssetPrefix("17837210489"),
        description: "Imagine being able to have a functional lantern but nothing else.",
    }),
    noble_lantern: asItemContext({
        name: "Noble Lantern",
        stackSize: 1,
        image: withAssetPrefix("13031282551"),
        description: "Show off your nobility with light!",
    }),
    ritualist_candle: asItemContext({
        name: "Ritualist Candle",
        stackSize: 1,
        image: withAssetPrefix("16371192204"),
        description: "Show your power with light.",
    }),
    sword: asItemContext({
        name: "Sword",
        stackSize: 1,
        image: withAssetPrefix("17837162667"),
        description: "A perfect blade in the hands of sacrificing and safety!",
    }),
    royal_lantern: asItemContext({
        name: "Royal Lantern",
        stackSize: 1,
        image: withAssetPrefix("18253625612"),
        description: "Your royalty, how lucky! Still... try not to die..",
    }),
    owner_lantern: asItemContext({
        name: "Owner Lantern",
        stackSize: 1,
        image: withAssetPrefix("16384697540"),
        description: "I'M THE HIGHEST LEVEL IN THIS SERVER!!!",
    }),
};
