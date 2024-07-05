import { World } from "@rbxts/matter";
import { LocalPlr, Plr } from "shared/components";
import { Acting } from "shared/components/actions";
import { Dead } from "shared/components/health";
import { CanSneak, OnLand, Sitting, Sneaking } from "shared/components/movements";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { isKeyDown } from "shared/hooks/keyInput";
import { State } from "shared/state";

function canSneak(w: World, s: State) {
    if (s.clientState !== "game") {
        for (const [e, localPlr, canSneak] of w.query(LocalPlr, CanSneak)) {
            w.remove(e, CanSneak);
        }
        return;
    }

    for (const [e, localPlr] of w.query(LocalPlr)) {
        if (
            hasComponents(w, e, OnLand) &&
            !hasOneOfComponents(w, e, Dead, Acting, Sitting) &&
            !isKeyDown("sprintDash")
        ) {
            w.insert(e, CanSneak({}));
        } else {
            w.remove(e, CanSneak, Sneaking);
        }

        break;
    }
}

export = canSneak;
