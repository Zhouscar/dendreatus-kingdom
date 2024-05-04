import { component } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { REPLICATED_COMPONENTS } from "./replicatedComponent";

export const TAG_COMPONENTS: Set<ComponentCtor> = new Set();

export default function tagComponent(name: string) {
    const Ctor = component<{}>(name, {});
    TAG_COMPONENTS.add(Ctor);
    REPLICATED_COMPONENTS.add(Ctor);
    return Ctor;
}
