import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Human, Plr } from "shared/components";
import { Jumping, UsableJumpContext } from "shared/components/movements";

function humanJump(w: World) {
    for (const [e, jumpingRecord] of w.queryChanged(Jumping)) {
        const plr = w.get(e, Plr);
        if (!plr || plr.player !== Players.LocalPlayer) continue;

        if (jumpingRecord.new === undefined) continue;

        const usableJumpContext = w.get(e, UsableJumpContext);
        if (!usableJumpContext) continue;

        const human = w.get(e, Human);
        if (!human) continue;

        human.humanoid.JumpPower = usableJumpContext.power;
        human.humanoid.Jump = true;
    }
}

export = humanJump;
