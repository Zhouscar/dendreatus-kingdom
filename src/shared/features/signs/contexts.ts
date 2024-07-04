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
            { style: "text", text: "this is a texting sign", heightPixels: 20 },
        ],
    ],
]);
