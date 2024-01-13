import { World } from "@rbxts/matter";
import { Plr } from "shared/components";

export default function findPlrE(w: World, player: Player) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player === player) return e;
    }
    return undefined;
}
