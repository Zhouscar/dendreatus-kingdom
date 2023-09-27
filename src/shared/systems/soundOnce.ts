import { AnyEntity, World } from "@rbxts/matter";
import { Sound } from "shared/components";

const onces: Set<AnyEntity> = new Set();

function soundOnce(w: World) {
    for (const [e, soundRecord] of w.queryChanged(Sound)) {
        if (soundRecord.new !== undefined) continue;
        onces.delete(e);
    }

    for (const [e, _sound] of w.query(Sound)) {
        if (onces.has(e)) {
            onces.delete(e);
            w.despawn(e);
        } else {
            onces.add(e);
        }
    }
}

export = soundOnce;
