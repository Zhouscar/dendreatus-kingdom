import { component } from "@rbxts/matter";
import { MONITORED_COMPONENTS } from "./monitoredComponent";
import { REPLICATED_COMPONENTS } from "./replicatedComponent";
import { ComponentCtor } from "@rbxts/matter/lib/component";

export const DoNotSync = component<{ ctors: Set<ComponentCtor> }>("DoNotSync");
export const DoNotReplicate = component<{ playersOfCtors: Map<ComponentCtor, Player | "ALL"> }>(
    "DoNotReplicate",
);

export const BIDIRECTIONAL_COMPONENTS: Set<ComponentCtor> = new Set();

export default function bidirectionalComponent<T extends object>(name: string, defaultData?: T) {
    const Ctor = component<T>(name, defaultData);
    MONITORED_COMPONENTS.add(Ctor);
    REPLICATED_COMPONENTS.add(Ctor);
    BIDIRECTIONAL_COMPONENTS.add(Ctor);
    return Ctor;
}

export const OWNED_BIDIRECTIONAL_COMPONENTS: Set<ComponentCtor> = new Set();

export function ownedBidirectionalComponent<T extends object>(name: string, defaultData?: T) {
    const Ctor = bidirectionalComponent(name, defaultData);
    OWNED_BIDIRECTIONAL_COMPONENTS.add(Ctor);
    return Ctor;
}
