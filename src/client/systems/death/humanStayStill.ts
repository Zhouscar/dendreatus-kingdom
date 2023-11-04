import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Human, Plr } from "shared/components";
import { Dead } from "shared/components/health";

function humanStayStill(w: World) {
    for (const [e, plr, human, dead] of w.query(Plr, Human, Dead)) {
        if (plr.player !== Players.LocalPlayer) return;

        if (human.humanoid.GetState() === Enum.HumanoidStateType.Running) return;

        human.humanoid.ChangeState("Running");
    }
}

export = { system: humanStayStill, event: "onPhysics" };
