import { World } from "@rbxts/matter";
import { TweenService } from "@rbxts/services";
import { Renderable, Sound, Transform } from "shared/components";
import { DoorLike, Interacted } from "shared/components/interactables";

function doorVisualsAndSound(w: World) {
    for (const [e, doorLikeRecord] of w.queryChanged(DoorLike)) {
        if (!w.contains(e)) continue;

        const doorLike = doorLikeRecord.new;
        if (doorLike === undefined) continue;

        const renderable = w.get(e, Renderable);
        if (renderable === undefined) continue;

        const transform = w.get(e, Transform);
        if (transform === undefined) continue;

        const hinge = renderable.pv.FindFirstChild("Hinge");
        if (hinge === undefined || !hinge.IsA("BasePart")) continue;

        if (doorLike.state === "opening") {
            const openGoalPart = renderable.pv.FindFirstChild("OpenGoal");
            if (openGoalPart === undefined || !openGoalPart.IsA("BasePart")) continue;

            const openGoal = { CFrame: openGoalPart.CFrame };

            const time = doorLike.openingOrClosingStartTime + doorLike.openDuration - os.clock();
            const tweenInfo = new TweenInfo(time, Enum.EasingStyle.Quad, Enum.EasingDirection.Out);

            const tween = TweenService.Create(hinge, tweenInfo, openGoal);

            tween.Play();

            w.spawn(
                Sound({
                    audibility: 1,
                    context: {
                        soundName: "doorOpen",
                    },
                    cf: transform.cf,
                }),
            );
        } else if (doorLike.state === "closing") {
            const closeGoalPart = renderable.pv.FindFirstChild("CloseGoal");
            if (closeGoalPart === undefined || !closeGoalPart.IsA("BasePart")) continue;

            const closeGoal = { CFrame: closeGoalPart.CFrame };

            const time = doorLike.openingOrClosingStartTime + doorLike.closeDuration - os.clock();
            const tweenInfo = new TweenInfo(time, Enum.EasingStyle.Quad, Enum.EasingDirection.In);

            const tween = TweenService.Create(hinge, tweenInfo, closeGoal);

            w.spawn(
                Sound({
                    audibility: 1,
                    context: {
                        volume: 1,
                        speed: 1,
                        soundName: "doorClose",
                    },
                    cf: transform.cf,
                }),
            );

            tween.Play();
        }
    }
}

export = doorVisualsAndSound;
