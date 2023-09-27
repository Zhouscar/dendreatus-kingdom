import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { CanSneak, Sneaking } from "shared/components/movements";
import { hasComponents } from "shared/hooks/components";
import { isKeyDown } from "shared/hooks/keyInput";

let debounce = false;

function sneak(w: World) {
    for (const [e, plr, _canSneak] of w.query(Plr, CanSneak)) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (!isKeyDown("sneak")) {
            debounce = false;
            break;
        }
        if (debounce) break;
        debounce = true;

        if (hasComponents(w, e, Sneaking)) {
            w.remove(e, Sneaking);
        } else {
            w.insert(e, Sneaking({}));
        }
        break;
    }
}

export = sneak;
