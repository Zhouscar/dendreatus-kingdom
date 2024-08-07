import { useDeltaTime, World } from "@rbxts/matter";
import { LocalPlr } from "shared/components";
import { CanDash, Dashing } from "shared/components/movements";
import gameTime from "shared/hooks/gameTime";
import { getKeysJustReleased, isKeyDown } from "shared/hooks/keyInput";

const THRESHOLD_TIME = 0.2;

let timeKeyHeld = 0;

function dash(w: World) {
    return;
    // wait til it's ready

    let didRun = false;

    const keysJustReleased = getKeysJustReleased();

    for (const [e, localPlr, canDash] of w.query(LocalPlr, CanDash)) {
        didRun = true;

        if (keysJustReleased.includes("sprintDash")) {
            if (timeKeyHeld <= THRESHOLD_TIME) {
                w.insert(e, Dashing({ startTime: gameTime() }));
            }
            timeKeyHeld = 0;
            continue;
        }

        if (isKeyDown("sprintDash")) {
            timeKeyHeld += useDeltaTime();
        }
    }

    if (!didRun) {
        timeKeyHeld = 0;
    }
}

export = dash;
