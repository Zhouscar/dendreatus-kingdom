import { AnyEntity, World } from "@rbxts/matter";
import { Plr, Transform } from "shared/components";
import { DEATH_PARTICLE_PROPS } from "shared/constants/deathParticleProps";
import { emitParticle } from "shared/effects/particles";

const plrECFs: Map<AnyEntity, CFrame> = new Map();

function plrFadeEffectWhenDelete(w: World) {
    for (const [e, plr, transform] of w.query(Plr, Transform)) {
        plrECFs.set(e, transform.cf);
    }

    plrECFs.forEach((cf, e) => {
        if (!w.contains(e)) {
            emitParticle(cf, 1, DEATH_PARTICLE_PROPS);
            plrECFs.delete(e);
        }
    });
}

export = plrFadeEffectWhenDelete;
