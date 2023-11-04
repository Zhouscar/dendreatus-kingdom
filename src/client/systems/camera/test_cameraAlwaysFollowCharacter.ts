import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr, Renderable } from "shared/components";
import { CameraState, State } from "shared/state";

function findCharacterPartToFollow(model: Model) {
    return model.FindFirstChild("Head") as BasePart;
}

export = function (w: World, s: State) {
    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const followPart = findCharacterPartToFollow(renderable.model);

        s.cameraState = CameraState.follow({ target: followPart });

        break;
    }
};
