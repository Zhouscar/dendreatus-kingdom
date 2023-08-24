import { World } from "@rbxts/matter";
import { Players, Workspace } from "@rbxts/services";
import { Plr } from "shared/components";
import { CanDash, Dashing } from "shared/components/movements";
import { isKeyDown } from "shared/hooks/keyInput";

let debounce = false;

function dash(w: World) {
    for (const [e, plr, canDash] of w.query(Plr, CanDash).without(Dashing)) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (!isKeyDown("sprintDash")) {
            debounce = false;
            return;
        }
        if (debounce) return;
        debounce = true;

        w.insert(e, Dashing({ startTime: os.clock() }));
        return;
    }
}

export = dash;
