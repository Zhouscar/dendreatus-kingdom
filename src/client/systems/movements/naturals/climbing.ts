import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Human, Plr } from "shared/components";
import { Climbing, Sneaking } from "shared/components/movements";

function climbing(w: World) {
    for (const [e, plr, human] of w.query(Plr, Human)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const humanState = human.humanoid.GetState();

        if (humanState === Enum.HumanoidStateType.Climbing) {
            w.insert(e, Climbing({}));
            w.remove(e, Sneaking);
        } else {
            w.remove(e, Climbing);
        }
    }
}

export = climbing;
