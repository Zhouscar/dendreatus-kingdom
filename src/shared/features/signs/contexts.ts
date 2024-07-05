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
            { style: "title", text: "Testing", heightPixels: 30 },
            { style: "text", text: "we're no stranger to", heightPixels: 20 },
            { style: "title", text: "love", heightPixels: 30 },
            { style: "text", text: "you know the rules and", heightPixels: 20 },
            { style: "title", text: "so do I", heightPixels: 30 },
            { style: "text", text: "a full commitment is what I'm", heightPixels: 20 },
            { style: "title", text: "thinking of", heightPixels: 30 },
            { style: "text", text: "you wouldn't get this from", heightPixels: 20 },
            { style: "title", text: "any other guy", heightPixels: 30 },
            { style: "text", text: "we're no stranger to", heightPixels: 20 },
            { style: "title", text: "love", heightPixels: 30 },
            { style: "text", text: "you know the rules and", heightPixels: 20 },
            { style: "title", text: "so do I", heightPixels: 30 },
            { style: "text", text: "a full commitment is what I'm", heightPixels: 20 },
            { style: "title", text: "thinking of", heightPixels: 30 },
            { style: "text", text: "you wouldn't get this from", heightPixels: 20 },
            { style: "title", text: "any other guy", heightPixels: 30 },
        ],
    ],
]);
