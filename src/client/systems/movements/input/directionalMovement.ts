import { World } from "@rbxts/matter";
import { Players, Workspace } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { DirectionalMovement } from "shared/components/movements";
import { isKeyDown } from "shared/hooks/keyInput";
import { getDirectionalVector3 } from "shared/calculations/coordinates";
import { ClientState, State } from "shared/state";

function directionalMovement(w: World, s: State) {
    const camera = Workspace.CurrentCamera;

    for (const [e, localPlr] of w.query(LocalPlr)) {
        if (!camera || s.clientState !== "game") {
            w.remove(e, DirectionalMovement);
            continue;
        }

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
        } else {
            w.remove(e, DirectionalMovement);
        }
    }
}

export = directionalMovement;
