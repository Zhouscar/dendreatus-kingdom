import { World } from "@rbxts/matter";
import { Dead, Health } from "shared/components/health";
import { hasComponents } from "shared/hooks/components";

function deathAtZeroHealth(w: World) {
    for (const [e, healthRecord] of w.queryChanged(Health)) {
        if (healthRecord.new === undefined) continue;

        if (hasComponents(w, e, Dead)) continue;
        if (healthRecord.new.current > 0) continue;

        w.insert(e, Dead({ startTime: -1 })); // start time is handled at client
    }
}

export = deathAtZeroHealth;
