import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Human, LocalPlr, Plr } from "shared/components";
import { Climbing, Sneaking } from "shared/components/movements";

function climbing(w: World) {
    for (const [e, localPlr, human] of w.query(LocalPlr, Human)) {
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
