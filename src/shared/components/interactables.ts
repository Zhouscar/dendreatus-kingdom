import { ComponentCreator } from "./creators";

export const Interactable = ComponentCreator.replicated<{}>("Interactable");
export type Interactable = ReturnType<typeof Interactable>;

export const TestInteractable = ComponentCreator.tag("TestInteractable");
export type TestInteractable = ReturnType<typeof TestInteractable>;

export const InteractableComponents = {
    Interactable,
    TestInteractable,
};
