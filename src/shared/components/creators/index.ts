import { component } from "@rbxts/matter";
import monitoredComponent from "./monitoredComponent";
import tagComponent from "./tagComponent";
import replicatedComponent from "./replicatedComponent";
import bidirectionalComponent, { protectedBidirectionalComponent } from "./bidirectionalComponent";

export namespace ComponentCreator {
    export const tag = tagComponent;
    export const base = component;
    export const monitored = monitoredComponent;
    export const replicated = replicatedComponent;
    export const bidirectional = bidirectionalComponent;
    export const protectedBidirectional = protectedBidirectionalComponent;
}
