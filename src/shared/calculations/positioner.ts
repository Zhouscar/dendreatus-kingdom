import { Positioner } from "shared/components";

export function getPositionerCurrent(positioner: Positioner, now: number) {
    const di = positioner.initialPosition;
    const vi = positioner.initialVelocity;
    const a = positioner.acceleration;
    const t = now - positioner.startTime;

    const df = di.add(vi.mul(t)).add(a.div(2).mul(t * t));
    const vf = vi.add(a.mul(t));

    return {
        position: df,
        velocity: vf,
    };
}
