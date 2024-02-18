import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Human, LocalPlr, Plr } from "shared/components";
import { Dead } from "shared/components/health";

function humanStayStill(w: World) {
    for (const [e, localPlr, human, dead] of w.query(LocalPlr, Human, Dead)) {
        if (human.humanoid.GetState() === Enum.HumanoidStateType.Running) return;

        human.humanoid.ChangeState("Running");
    }
}

export = { system: humanStayStill, event: "onPhysics" };
