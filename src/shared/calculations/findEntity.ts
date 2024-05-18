import { AnyEntity, World } from "@rbxts/matter";
import { Plr, Renderable, Transform } from "shared/components";

export function findPlrE(w: World, player: Player) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player === player) return e;
    }
    return undefined;
}

export function findInstanceE(w: World, instance: Instance) {
    for (const [e, renderable] of w.query(Renderable)) {
        if (renderable.pv.IsAncestorOf(instance)) return e;
    }
    return undefined;
}
