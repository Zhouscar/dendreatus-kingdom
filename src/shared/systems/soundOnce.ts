import { AnyEntity, World } from "@rbxts/matter";
import { Sound } from "shared/components";
import { DoNotReplicate } from "shared/components/creators/bidirectionalComponent";

const onces: Set<AnyEntity> = new Set();

function soundOnce(w: World) {
    for (const [e, soundRecord] of w.queryChanged(Sound)) {
        if (soundRecord.new !== undefined) continue;
        onces.delete(e);
    }

    for (const [e, _sound] of w.query(Sound)) {
        if (onces.has(e)) {
            onces.delete(e);
            w.insert(e, DoNotReplicate({ playersOfCtors: new Map([[Sound, "ALL"]]) }));
            w.remove(e, Sound);
        } else {
            onces.add(e);
        }
    }
}

export = soundOnce;
