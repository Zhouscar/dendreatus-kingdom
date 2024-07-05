import { ComponentCtor } from "@rbxts/matter/lib/component";
import { TestSign } from "shared/components/signs";

export type SignElement = {
    style: "title" | "text";
    text: string;
    heightPixels: number;
};

export type SignContext = SignElement[];

export const SIGN_CONTEXTS: Map<ComponentCtor, SignContext> = new Map([
    [
        TestSign,
        [
            { style: "title", text: "Never Gonna Give You Up", heightPixels: 30 },
            { style: "text", text: "We're no strangers to love", heightPixels: 20 },
            { style: "text", text: "You know the rules and so do I (do I)", heightPixels: 20 },
            { style: "text", text: "A full commitment's what I'm thinking of", heightPixels: 20 },
            { style: "text", text: "You wouldn't get this from any other guy", heightPixels: 20 },
            { style: "text", text: "I just wanna tell you how I'm feeling", heightPixels: 20 },
            { style: "text", text: "Gotta make you understand", heightPixels: 20 },
            { style: "text", text: "Never gonna give you up", heightPixels: 20 },
            { style: "text", text: "Never gonna let you down", heightPixels: 20 },
            { style: "text", text: "Never gonna run around and desert you", heightPixels: 20 },
            { style: "text", text: "Never gonna make you cry", heightPixels: 20 },
            { style: "text", text: "Never gonna say goodbye", heightPixels: 20 },
            { style: "text", text: "Never gonna tell a lie and hurt you", heightPixels: 20 },
            { style: "text", text: "We've known each other for so long", heightPixels: 20 },
            {
                style: "text",
                text: "Your heart's been aching, but you're too shy to say it (say it)",
                heightPixels: 20,
            },
            {
                style: "text",
                text: "Inside, we both know what's been going on (going on)",
                heightPixels: 20,
            },
            { style: "text", text: "We know the game and we're gonna play it", heightPixels: 20 },
            { style: "text", text: "And if you ask me how I'm feeling", heightPixels: 20 },
            { style: "text", text: "Don't tell me you're too blind to see", heightPixels: 20 },
            { style: "text", text: "Never gonna give you up", heightPixels: 20 },
            { style: "text", text: "Never gonna let you down", heightPixels: 20 },
            { style: "text", text: "Never gonna run around and desert you", heightPixels: 20 },
            { style: "text", text: "Never gonna make you cry", heightPixels: 20 },
            { style: "text", text: "Never gonna say goodbye", heightPixels: 20 },
            { style: "text", text: "Never gonna tell a lie and hurt you", heightPixels: 20 },
            { style: "text", text: "Never gonna give you up", heightPixels: 20 },
            { style: "text", text: "Never gonna let you down", heightPixels: 20 },
            { style: "text", text: "Never gonna run around and desert you", heightPixels: 20 },
            { style: "text", text: "Never gonna make you cry", heightPixels: 20 },
            { style: "text", text: "Never gonna say goodbye", heightPixels: 20 },
            { style: "text", text: "Never gonna tell a lie and hurt you", heightPixels: 20 },
            { style: "text", text: "We've known each other for so long", heightPixels: 20 },
            {
                style: "text",
                text: "Your heart's been aching, but you're too shy to say it (to say it)",
                heightPixels: 20,
            },
            {
                style: "text",
                text: "Inside, we both know what's been going on (going on)",
                heightPixels: 20,
            },
            { style: "text", text: "We know the game and we're gonna play it", heightPixels: 20 },
            { style: "text", text: "I just wanna tell you how I'm feeling", heightPixels: 20 },
            { style: "text", text: "Gotta make you understand", heightPixels: 20 },
            { style: "text", text: "Never gonna give you up", heightPixels: 20 },
            { style: "text", text: "Never gonna let you down", heightPixels: 20 },
            { style: "text", text: "Never gonna run around and desert you", heightPixels: 20 },
            { style: "text", text: "Never gonna make you cry", heightPixels: 20 },
            { style: "text", text: "Never gonna say goodbye", heightPixels: 20 },
            { style: "text", text: "Never gonna tell a lie and hurt you", heightPixels: 20 },
            { style: "text", text: "Never gonna give you up", heightPixels: 20 },
            { style: "text", text: "Never gonna let you down", heightPixels: 20 },
            { style: "text", text: "Never gonna run around and desert you", heightPixels: 20 },
            { style: "text", text: "Never gonna make you cry", heightPixels: 20 },
            { style: "text", text: "Never gonna say goodbye", heightPixels: 20 },
            { style: "text", text: "Never gonna tell a lie and hurt you", heightPixels: 20 },
            { style: "text", text: "Never gonna give you up", heightPixels: 20 },
            { style: "text", text: "Never gonna let you down", heightPixels: 20 },
            { style: "text", text: "Never gonna run around and desert you", heightPixels: 20 },
            { style: "text", text: "Never gonna make you cry", heightPixels: 20 },
            { style: "text", text: "Never gonna say goodbye", heightPixels: 20 },
            { style: "text", text: "Never gonna tell a lie and hurt you", heightPixels: 20 },
        ],
    ],
]);
