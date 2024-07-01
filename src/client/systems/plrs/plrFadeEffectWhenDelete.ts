import { AnyEntity, World } from "@rbxts/matter";
import { Plr, Transform } from "shared/components";
import { emitParticle } from "shared/effects/particles";

const plrECFs: Map<AnyEntity, CFrame> = new Map();

function plrFadeEffectWhenDelete(w: World) {
    for (const [e, plr, transform] of w.query(Plr, Transform)) {
        plrECFs.set(e, transform.cf);
    }

    plrECFs.forEach((cf, e) => {
        if (w.contains(e)) return; // the entity has to not exist anymore for it to fade
        emitParticle(cf, 1, {});
        plrECFs.delete(e);
    });
}

export = plrFadeEffectWhenDelete;
