import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Human, Plr } from "shared/components";
import {
    CanDirectionallyMove,
    DirectionalMovement,
    Landing,
    PotentialDirectionalMovement,
    UsableDirectionalMovementContext,
} from "shared/components/movements";

function humanDirectionalMovement(w: World) {
    for (const [
        e,
        plr,
        human,
        directionalMovement,
        potentialDirectionalMovement,
        usableDirectionalMovementContext,
        canDirectionallyMove,
    ] of w.query(
        Plr,
        Human,
        DirectionalMovement,
        PotentialDirectionalMovement,
        UsableDirectionalMovementContext,
        CanDirectionallyMove,
    )) {
        if (plr.player !== Players.LocalPlayer) continue;
        const newWalkSpeed =
            potentialDirectionalMovement.type === "walk"
                ? usableDirectionalMovementContext.walk
                : potentialDirectionalMovement.type === "sprint"
                ? usableDirectionalMovementContext.sprint
                : potentialDirectionalMovement.type === "sneak"
                ? usableDirectionalMovementContext.sneak
                : potentialDirectionalMovement.type === "dive"
                ? usableDirectionalMovementContext.dive
                : potentialDirectionalMovement.type === "swim"
                ? usableDirectionalMovementContext.swim
                : 0;

        human.humanoid.WalkSpeed = newWalkSpeed;
        human.humanoid.Move(directionalMovement.direction, false);

        w.remove(e, Landing);
        return;
    }
}

export = humanDirectionalMovement;
