import { component } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { withinTopoContext } from "@rbxts/matter/lib/topoRuntime";

export const TAG_COMPONENTS: Set<ComponentCtor> = new Set();
// TODO: replaces BOUND TAGS in setup tags

export default function tagComponent(name: string) {
    const Ctor = component<{}>(name, {});
    TAG_COMPONENTS.add(Ctor);
    return Ctor;
}
