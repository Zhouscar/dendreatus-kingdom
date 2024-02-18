import { AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { LocalPlr } from "shared/components";

export function isLocalPlr(w: World, e: AnyEntity) {
    return hasComponents(w, e, LocalPlr);
}

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
