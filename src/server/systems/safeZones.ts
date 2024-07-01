import { World, useEvent } from "@rbxts/matter";
import { findInstanceE } from "shared/calculations/findEntity";
import { InSafeZone, Plr, Renderable, SafeZone } from "shared/components";
import { hasComponents } from "shared/hooks/components";
import damageHurts from "./health/damageHurts";
import { Damage } from "shared/components/health";

function safeZones(w: World) {
    for (const [e, safeZone, renderable] of w.query(SafeZone, Renderable)) {
        if (!renderable.pv.IsA("BasePart")) continue;

        for (const [_, hit] of useEvent(renderable.pv, "Touched")) {
            const hitE = findInstanceE(w, hit);
            if (hitE === undefined || !hasComponents(w, hitE, Plr)) continue;
            if (hasComponents(w, hitE, SafeZone)) continue;
            w.insert(hitE, InSafeZone({}));
        }

        for (const [_, hit] of useEvent(renderable.pv, "TouchEnded")) {
            const hitE = findInstanceE(w, hit);
            if (hitE === undefined || !hasComponents(w, hitE, Plr)) continue;
            w.remove(hitE, InSafeZone);
        }
    }

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (damageRecord.new === undefined) continue;

        if (hasComponents(w, e, InSafeZone)) {
            w.remove(e, Damage);
        }
    }
}

export = { system: safeZones, before: damageHurts };
