import { component } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";

export const REPLICATED_COMPONENTS: Set<ComponentCtor> = new Set();

export default function replicatedComponent<T extends object>(name: string, defaultData?: T) {
    const Ctor = component<T>(name, defaultData);
    REPLICATED_COMPONENTS.add(Ctor);
    return Ctor;
}
