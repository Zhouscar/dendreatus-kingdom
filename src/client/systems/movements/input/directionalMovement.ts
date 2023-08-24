import { World } from "@rbxts/matter";
import { Players, Workspace } from "@rbxts/services";
import { Plr } from "shared/components";
import { DirectionalMovement } from "shared/components/movements";
import { isKeyDown } from "shared/hooks/keyInput";
import { getDirectionalVector3 } from "shared/math/coordinates";

function directionalMovement(w: World) {
    const camera = Workspace.CurrentCamera;
    if (!camera) return;

    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;
        let desiredDirection = Vector3.zero;
        if (isKeyDown("moveForward"))
            desiredDirection = desiredDirection.add(
                getDirectionalVector3(camera.CFrame, "forward"),
            );
        if (isKeyDown("moveBackward"))
            desiredDirection = desiredDirection.add(
                getDirectionalVector3(camera.CFrame, "backward"),
            );
        if (isKeyDown("moveLeft"))
            desiredDirection = desiredDirection.add(getDirectionalVector3(camera.CFrame, "left"));
        if (isKeyDown("moveRight"))
            desiredDirection = desiredDirection.add(getDirectionalVector3(camera.CFrame, "right"));
        if (desiredDirection !== Vector3.zero) {
            desiredDirection = desiredDirection.Unit;
            w.insert(e, DirectionalMovement({ direction: desiredDirection }));
            return;
        }
        w.remove(e, DirectionalMovement);
    }
}

export = directionalMovement;
