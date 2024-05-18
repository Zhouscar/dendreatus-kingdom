import { Make } from "@rbxts/altmake";
import { ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { State } from "shared/state";
import { raycastVisualizePartsContainer } from "./raycastHitbox";
import { AnyEntity, World } from "@rbxts/matter";
import { BloodDrip, Positioner, Renderable } from "shared/components";

const r = math.random;

const bloodContainer = Make("Folder", {
    Name: "BloodContainer",
    Parent: Workspace,
});

const GRAVITY = new Vector3(0, -50, 0);

export function doDrip(w: World, creator: Instance, position: Vector3, velocity: Vector3) {
    const dripPart = ReplicatedStorage.assets.blood.dripPart.Clone();
    dripPart.Position = position;
    dripPart.Parent = bloodContainer;
    dripPart.Anchored = true;
    dripPart.CanCollide = false;

    // dripPart.ApplyImpulse(velocity.mul(dripPart.GetMass()));

    // const context: [BasePart, Instance] = [dripPart, creator];

    // s.bloodDrips.add(context);
    // dripPart.Touched.Connect((hit) => {
    //     if (!hit.Anchored || !hit.CanCollide || hit.Transparency === 1) return;
    //     if (hit.IsDescendantOf(raycastVisualizePartsContainer)) return;
    //     s.bloodDrips.delete(context);
    //     dripPart.Destroy();
    // });

    const params = new RaycastParams();
    params.FilterType = Enum.RaycastFilterType.Exclude;
    params.IgnoreWater = true;
    params.AddToFilter([dripPart, creator, raycastVisualizePartsContainer, bloodContainer]);

    w.spawn(
        BloodDrip({}),
        Renderable({ pv: dripPart }),
        Positioner({
            initialPosition: position,
            initialVelocity: velocity,
            acceleration: GRAVITY,
            startTime: os.clock(),
            raycastParams: params,
        }),
    );
}

const splatterTweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Quint);
const getSplatterTweenGoal: () => Partial<ExtractMembers<BasePart, Tweenable>> = () => {
    const size = r(1, 3000) / 1000;
    return {
        Size: new Vector3(0.1, size, size),
    };
};

const hideSplatterTweenInfo = new TweenInfo(5);
const hideSplatterTweenGoal: Partial<ExtractMembers<BasePart, Tweenable>> = {
    Transparency: 1,
};

export function doSplatter(w: World, e: AnyEntity, cf: CFrame) {
    if (w.contains(e)) {
        w.despawn(e);
    }

    const splatterPart = ReplicatedStorage.assets.blood.splatterPart.Clone();

    splatterPart.CFrame = cf.mul(CFrame.Angles(0, math.rad(90), 0));
    splatterPart.Size = Vector3.zero;
    splatterPart.Parent = bloodContainer;

    const tween = TweenService.Create(splatterPart, splatterTweenInfo, getSplatterTweenGoal());
    const hideTween = TweenService.Create(
        splatterPart,
        hideSplatterTweenInfo,
        hideSplatterTweenGoal,
    );

    task.spawn(() => {
        tween.Play();

        wait(r(20, 100) / 10);
        if (!splatterPart.IsDescendantOf(Workspace)) return;

        hideTween.Play();
        hideTween.Completed.Once(() => {
            if (!splatterPart.IsDescendantOf(Workspace)) return;
            splatterPart.Destroy();
        });
    });
}

export function bleed(
    w: World,
    creator: Instance,
    minAmount: number,
    maxAmount: number,
    force: number,
    offset: number,
    position: Vector3,
) {
    const amount = r(minAmount, maxAmount);
    for (let i = 0; i < amount; i++) {
        const velocity = new Vector3(r(-force, force), r(-force, force) + offset, r(-force, force));

        doDrip(w, creator, position, velocity);
    }
}
