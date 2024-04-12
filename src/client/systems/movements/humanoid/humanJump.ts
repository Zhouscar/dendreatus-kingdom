import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Human, LocalPlr, Plr } from "shared/components";
import { JumpContext, Jumping, WillJump } from "shared/components/movements";
import { forMovement, preloadAnimation, resumeAnimation } from "shared/effects/animations";
import { isLocalPlr } from "shared/hooks/components";

const jumpAnimId = withAssetPrefix("14215254834");

function humanJump(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        if (!isLocalPlr(w, e)) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimation(animatableRecord.new.animator, jumpAnimId);
    }

    for (const [_e, localPlr, _willJump, animatable] of w.query(LocalPlr, WillJump, Animatable)) {
        resumeAnimation(animatable.animator, jumpAnimId, forMovement, 1, false);
    }

    for (const [e, jumpingRecord] of w.queryChanged(Jumping)) {
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
