import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import { CameraState } from "client/cameraHandler/cameraProps";
import { ViewVector } from "shared/classes";
import { Plr, Renderable } from "shared/components";
import { State } from "shared/state";

const INVENTORY_VIEW_VECTOR = new ViewVector(5, 0, 0);

function cameraInventory(w: World, s: State) {
    if (s.clientState !== "inventory") return;

    let changed = false;

    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const targetPart = renderable.model.PrimaryPart;
        if (!targetPart) break;

        if (!useChange([targetPart], "Props")) return;

        s.cameraProps.state = CameraState.angleView({
            target: targetPart,
            viewVector: INVENTORY_VIEW_VECTOR,
        });

        changed = true;
    }

    if (useChange([changed], "Changed") && !changed) {
        s.cameraProps.state = CameraState.none({});
    }
}

export = cameraInventory;
