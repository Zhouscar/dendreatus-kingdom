import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Human, Plr } from "shared/components";
import { Jumping, UsableJumpContext, WillJump } from "shared/components/movements";
import { forMovement, preloadAnimation, resumeAnimation } from "shared/effects/animations";

const jumpAnimId = withAssetPrefix("14215254834");

function humanJump(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimation(animatableRecord.new.animator, jumpAnimId);
    }

    for (const [_e, plr, _willJump, animatable] of w.query(Plr, WillJump, Animatable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        resumeAnimation(animatable.animator, jumpAnimId, forMovement, 1, false);
    }

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

        w.remove(e, Jumping);
    }
}

export = humanJump;
