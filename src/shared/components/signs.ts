import { ComponentCtor } from "@rbxts/matter/lib/component";
import { ComponentCreator } from "./creators";
import { ComponentNames } from "./serde";

// Signs

export const TestSign = ComponentCreator.tag("TestSign");
export type TestSign = ReturnType<typeof TestSign>;

export const WelcomeSign = ComponentCreator.tag("WelcomeSign");
export type WelcomeSign = ReturnType<typeof WelcomeSign>;

export const ControlsSign = ComponentCreator.tag("ControlsSign");
export type ControlsSign = ReturnType<typeof ControlsSign>;

export const CookRecipeSign = ComponentCreator.tag("CookRecipeSign");
export type CookRecipeSign = ReturnType<typeof CookRecipeSign>;

export const CraftRecipeSign = ComponentCreator.tag("CraftRecipeSign");
export type CraftRecipeSign = ReturnType<typeof CraftRecipeSign>;

// \ Signs

export const Sign = ComponentCreator.replicated<{ signComponentName: string }>("Sign");
export type Sign = ReturnType<typeof Sign>;

export const ReadingSign = ComponentCreator.base<{ signComponentName: string }>("Sign");
export type ReadingSign = ReturnType<typeof ReadingSign>;

export const SignComponents = {
    TestSign,
    Sign,
    ReadingSign,
    WelcomeSign,
    ControlsSign,
    CookRecipeSign,
    CraftRecipeSign,
};
