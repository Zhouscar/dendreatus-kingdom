import { World } from "@rbxts/matter";
import { Dead } from "shared/components/health";

function readjustDeathTime(w: World) {
    for (const [e, deadRecord] of w.queryChanged(Dead)) {
        if (!w.contains(e)) continue;
        if (!deadRecord.new) continue;
        if (deadRecord.new.startTime !== -1) continue;

        w.insert(
            e,
            deadRecord.new.patch({
                startTime: tick(),
            }),
        );
    }
}

export = readjustDeathTime;
