import { ComponentCtor } from "@rbxts/matter/lib/component";
import { ComponentCreator } from "./creators";
import { ComponentNames } from "./serde";

export const TestSign = ComponentCreator.tag("TestSign");
export type TestSign = ReturnType<typeof TestSign>;

export const Sign = ComponentCreator.replicated<{ signComponentName: string }>("Sign");
export type Sign = ReturnType<typeof Sign>;

export const ReadingSign = ComponentCreator.base<{ signComponentName: string }>("Sign");
export type ReadingSign = ReturnType<typeof ReadingSign>;

export const SignComponents = {
    TestSign,
    Sign,
    ReadingSign,
};
