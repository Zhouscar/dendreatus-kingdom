import { World } from "@rbxts/matter";
import { Dead } from "shared/components/health";
import gameTime from "shared/hooks/gameTime";

function readjustDeathTime(w: World) {
    for (const [e, deadRecord] of w.queryChanged(Dead)) {
        if (!w.contains(e)) continue;
        if (!deadRecord.new) continue;
        if (deadRecord.new.startTime !== -1) continue;

        w.insert(
            e,
            deadRecord.new.patch({
                startTime: gameTime(),
            }),
        );
    }
}

export = readjustDeathTime;
