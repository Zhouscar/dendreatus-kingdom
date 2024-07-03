import { World } from "@rbxts/matter";
import { Human } from "shared/components";

function humanNoDefaultNametags(w: World) {
    for (const [e, human] of w.query(Human)) {
        if (human.humanoid.DisplayDistanceType === Enum.HumanoidDisplayDistanceType.None) continue;
        human.humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None;
    }
}

export = humanNoDefaultNametags;
