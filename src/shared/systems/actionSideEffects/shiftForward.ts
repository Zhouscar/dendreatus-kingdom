import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Renderable } from "shared/components";
import { ShiftForward } from "shared/components/actions";
import { FORWARD } from "shared/constants/direction";
import { getCustomLinearVelocity } from "shared/hooks/memoForces";

const SHIFT_FORWARD_DURATION = 0.1;

function shiftForward(w: World) {
    for (const [e, shiftForwardRecord] of w.queryChanged(ShiftForward)) {
        if (!w.contains(e)) continue;

        const renderable = w.get(e, Renderable);
        if (renderable === undefined) continue;
        if (!renderable.pv.IsA("Model")) continue;

        const rootPart = renderable.pv.PrimaryPart;
        if (!rootPart) continue;

        const linearVelocity = getCustomLinearVelocity(rootPart, "ShiftForward");

        const isRemoved = shiftForwardRecord.new === undefined;
        if (!useChange([isRemoved], e)) continue;

        if (!isRemoved) {
            linearVelocity.VectorVelocity = FORWARD.mul(shiftForwardRecord.new!.force);
        }

        linearVelocity.Enabled = !isRemoved;
    }

    for (const [e, shiftForward] of w.query(ShiftForward)) {
        const endTime = shiftForward.startTime + SHIFT_FORWARD_DURATION;
        if (tick() >= endTime) {
            w.remove(e, ShiftForward);
        }
    }
}

export = shiftForward;
