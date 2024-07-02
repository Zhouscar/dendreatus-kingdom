import { AnyEntity, World } from "@rbxts/matter";
import { Sound } from "shared/components";
import { DoNotReplicate, DoNotSync } from "shared/components/creators/bidirectionalComponent";
import { HOST } from "shared/host";
import { State } from "shared/state";

const onces: Set<AnyEntity> = new Set();

function soundOnce(w: World, s: State) {
    for (const [e, soundRecord] of w.queryChanged(Sound)) {
        if (!w.contains(e)) continue;

        if (soundRecord.new !== undefined) continue;
        onces.delete(e);
    }

    for (const [e, _sound] of w.query(Sound)) {
        if (onces.has(e)) {
            onces.delete(e);
            if (HOST === "CLIENT") {
                w.insert(e, DoNotSync({ ctors: new Set([Sound]) }));
            } else {
                w.insert(e, DoNotReplicate({ playersOfCtors: new Map([[Sound, "ALL"]]) }));
            }
            w.remove(e, Sound);
        } else {
            onces.add(e);
        }
    }
}

export = soundOnce;
