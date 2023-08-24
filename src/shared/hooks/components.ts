import { AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { Plr } from "shared/components";
import { Host } from "types";

export function hasComponents(w: World, e: AnyEntity, ...components: ComponentCtor[]) {
    return components.reduce((accum, comp) => {
        if (!accum) return false;
        if (!w.get(e, comp)) return false;
        return true;
    }, true);
}

export function hasOneOfComponents(w: World, e: AnyEntity, ...components: ComponentCtor[]) {
    return components.reduce((accum, comp) => {
        if (accum) return true;
        if (!w.get(e, comp)) return false;
        return true;
    }, false);
}
