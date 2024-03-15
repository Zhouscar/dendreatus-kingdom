import { component } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";

export const MONITORED_COMPONENTS: Set<ComponentCtor> = new Set();

export default function monitoredComponent<T extends object>(name: string, defaultData?: T) {
    const Ctor = component<T>(name, defaultData);
    MONITORED_COMPONENTS.add(Ctor);
    return Ctor;
}
