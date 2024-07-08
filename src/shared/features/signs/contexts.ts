import { ComponentCtor } from "@rbxts/matter/lib/component";
import {
    ControlsSign,
    CookRecipeSign,
    CraftRecipeSign,
    TestSign,
    WelcomeSign,
} from "shared/components/signs";

export type SignElement = {
    style: "title" | "text";
    text: string;
};

export type SignContext = SignElement[];

export const SIGN_CONTEXTS: Map<ComponentCtor, SignContext> = new Map([
    [
        TestSign,
        [
            { style: "title", text: "Never Gonna Give You Up" },
            { style: "text", text: "We're no strangers to love" },
            { style: "text", text: "You know the rules and so do I (do I)" },
            { style: "text", text: "A full commitment's what I'm thinking of" },
            { style: "text", text: "You wouldn't get this from any other guy" },
            { style: "text", text: "I just wanna tell you how I'm feeling" },
            { style: "text", text: "Gotta make you understand" },
            { style: "text", text: "Never gonna give you up" },
            { style: "text", text: "Never gonna let you down" },
            { style: "text", text: "Never gonna run around and desert you" },
            { style: "text", text: "Never gonna make you cry" },
            { style: "text", text: "Never gonna say goodbye" },
            { style: "text", text: "Never gonna tell a lie and hurt you" },
            { style: "text", text: "We've known each other for so long" },
            {
                style: "text",
                text: "Your heart's been aching, but you're too shy to say it (say it)",
            },
            {
                style: "text",
                text: "Inside, we both know what's been going on (going on)",
            },
            { style: "text", text: "We know the game and we're gonna play it" },
            { style: "text", text: "And if you ask me how I'm feeling" },
            { style: "text", text: "Don't tell me you're too blind to see" },
            { style: "text", text: "Never gonna give you up" },
            { style: "text", text: "Never gonna let you down" },
            { style: "text", text: "Never gonna run around and desert you" },
            { style: "text", text: "Never gonna make you cry" },
            { style: "text", text: "Never gonna say goodbye" },
            { style: "text", text: "Never gonna tell a lie and hurt you" },
            { style: "text", text: "Never gonna give you up" },
            { style: "text", text: "Never gonna let you down" },
            { style: "text", text: "Never gonna run around and desert you" },
            { style: "text", text: "Never gonna make you cry" },
            { style: "text", text: "Never gonna say goodbye" },
            { style: "text", text: "Never gonna tell a lie and hurt you" },
            { style: "text", text: "We've known each other for so long" },
            {
                style: "text",
                text: "Your heart's been aching, but you're too shy to say it (to say it)",
            },
            { style: "text", text: "Inside, we both know what's been going on (going on)" },
            { style: "text", text: "We know the game and we're gonna play it" },
            { style: "text", text: "I just wanna tell you how I'm feeling" },
            { style: "text", text: "Gotta make you understand" },
            { style: "text", text: "Never gonna give you up" },
            { style: "text", text: "Never gonna let you down" },
            { style: "text", text: "Never gonna run around and desert you" },
            { style: "text", text: "Never gonna make you cry" },
            { style: "text", text: "Never gonna say goodbye" },
            { style: "text", text: "Never gonna tell a lie and hurt you" },
            { style: "text", text: "Never gonna give you up" },
            { style: "text", text: "Never gonna let you down" },
            { style: "text", text: "Never gonna run around and desert you" },
            { style: "text", text: "Never gonna make you cry" },
            { style: "text", text: "Never gonna say goodbye" },
            { style: "text", text: "Never gonna tell a lie and hurt you" },
            { style: "text", text: "Never gonna give you up" },
            { style: "text", text: "Never gonna let you down" },
            { style: "text", text: "Never gonna run around and desert you" },
            { style: "text", text: "Never gonna make you cry" },
            { style: "text", text: "Never gonna say goodbye" },
            { style: "text", text: "Never gonna tell a lie and hurt you" },
        ],
    ],
    [
        WelcomeSign,
        [
            { style: "title", text: "Welcome to the Demo version of Dendraetus Kingdom" },
            {
                style: "text",
                text:
                    "Special Thanks to:\n" +
                    "Akihiro (@Yokai_Blooming) - Original Idea, Modeling, Sound Choices, \n" +
                    "Zh_ouscar (@NiarbOn) - Programming, Game Mechanics, UI Design\n",
            },
            {
                style: "text",
                text:
                    "An survival exploration horror game! Your current objective is to escape this cave, collect items along the way, and head to straight to the village to start your new life! The village is the main spot to craft and cook while you go on your own endeavors. Kill other players to save time on cooking and crafting items, or, become friends and fight together to benefit.\n" +
                    "\n" +
                    "Objectives\n" +
                    "- escape cave\n" +
                    "- head to the village to cook and craft weapons scavenge items or kill for items to survive\n" +
                    "- scavenge items or kill for items to survive\n" +
                    "\n" +
                    "What is expected\n" +
                    "- This is a Demo version so expect bugs and incomplete gameplay\n" +
                    "- If you spot any large bugs, its encourage to report them in the communications server!\n" +
                    "- There will be large changes on the way after we see how the demo performs.\n",
            },
        ],
    ],
    [
        ControlsSign,
        [
            { style: "title", text: "Controls" },
            { style: "text", text: "Movement - W, A, S, D" },
            { style: "text", text: "Jump - Space" },
            { style: "text", text: "Sprint - Shift (sometimes may not work)" },
            { style: "text", text: "Sneak - C" },
            { style: "text", text: "Chat - /" },
            { style: "text", text: "Toggle Inventory - E" },
            { style: "text", text: "Interact - F" },
            { style: "text", text: "Hotbar Items - 1, 2, 3, 4, 5, 6, 7, 8, 9, 10" },
        ],
    ],
    [
        CraftRecipeSign,
        [
            { style: "text", text: "Crafting Recipes" },
            { style: "text", text: "Scrap Metal + Rope + Nails = Spikeball" },
            { style: "text", text: "Scrap Metal + Rope + Sap = Scrap Blade" },
        ],
    ],
    [
        CookRecipeSign,
        [
            { style: "text", text: "Cooking Recipes" },
            { style: "text", text: "Mushroom + Egg + Flour = Mushroom Soup" },
        ],
    ],
]);
