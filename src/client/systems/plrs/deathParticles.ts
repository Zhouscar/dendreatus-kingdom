import { World } from "@rbxts/matter";
import { Transform } from "shared/components";
import { Dead } from "shared/components/health";
import { DEATH_PARTICLE_PROPS } from "shared/constants/deathParticleProps";
import { emitParticle } from "shared/effects/particles";

function deathParticles(w: World) {
    for (const [e, deadRecord] of w.queryChanged(Dead)) {
        if (!w.contains(e)) continue;
        if (deadRecord.new === undefined) continue;

        const transform = w.get(e, Transform);
        if (transform === undefined) continue;

        emitParticle(transform.cf, 1, DEATH_PARTICLE_PROPS);
    }
}

export = deathParticles;
