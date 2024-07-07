import { World } from "@rbxts/matter";
import { Animatable, Human, LocalPlr, Plr } from "shared/components";
import { JumpContext, Jumping, WillJump } from "shared/components/movements";
import { resumeAnimation } from "shared/effects/animations";
import { isLocalPlr } from "shared/hooks/components";

function humanJump(w: World) {
    for (const [_e, localPlr, _willJump, animatable] of w.query(LocalPlr, WillJump, Animatable)) {
        resumeAnimation(animatable.animator, "jump", "Movement", true, 1, false);
    }

    for (const [e, jumpingRecord] of w.queryChanged(Jumping)) {
        if (!w.contains(e)) continue;
        if (!isLocalPlr(w, e)) continue;

        if (jumpingRecord.new === undefined) continue;

        const jumpContext = w.get(e, JumpContext);
        if (!jumpContext) continue;

        const human = w.get(e, Human);
        if (!human) continue;

        human.humanoid.JumpPower = jumpContext.power;
        human.humanoid.Jump = true;

        w.remove(e, Jumping);
    }
}

export = humanJump;
