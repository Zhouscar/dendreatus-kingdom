import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import { CameraState } from "client/cameraHandler/cameraProps";
import { Plr, Renderable } from "shared/components";
import { State } from "shared/state";

function findCharacterPartToFollow(model: Model) {
    return model.FindFirstChild("Head") as BasePart | undefined;
}

function cameraGame(w: World, s: State) {
    if (s.clientState !== "game") return;

    let changed = false;

    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const followPart = findCharacterPartToFollow(renderable.model);
        if (!followPart) break;

        if (!useChange([followPart], "Props")) return;

        s.cameraProps.state = CameraState.follow({
            target: followPart,
        });

        changed = true;
    }

    if (useChange([changed], "Changed") && !changed) {
        s.cameraProps.state = CameraState.none({});
    }
}

export = cameraGame;
