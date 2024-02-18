import { World, useEvent } from "@rbxts/matter";
import { Human, LocalPlr } from "shared/components";

function humanCantTrip(w: World) {
    for (const [e, localPlr, human] of w.query(LocalPlr, Human)) {
        if (human.humanoid.GetState().Name === "FallingDown") {
            human.humanoid.ChangeState(Enum.HumanoidStateType.GettingUp);
        }
    }
}

export = { system: humanCantTrip, event: "onPhysics" };
