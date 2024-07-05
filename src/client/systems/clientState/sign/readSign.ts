import { World } from "@rbxts/matter";
import { LocalPlr } from "shared/components";
import { ReadingSign } from "shared/components/signs";
import { State } from "shared/state";

function readSign(w: World, s: State) {
    for (const [e, localPlr, readingSign] of w.query(LocalPlr, ReadingSign)) {
        if (s.clientState === "game" || s.clientState === "sign") {
            s.clientState = "sign";
        } else {
            w.remove(e, ReadingSign);
        }
    }

    for (const [e, readingSignRecord] of w.queryChanged(ReadingSign)) {
        if (readingSignRecord.new !== undefined) continue;

        if (s.clientState === "sign") {
            s.clientState = "game";
        }
    }
}

export = readSign;
