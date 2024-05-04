import { World } from "@rbxts/matter";
import { has } from "@rbxts/sift/out/Dictionary";
import { Animatable, LocalPlr } from "shared/components";
import { Interacting } from "shared/components/interactables";
import { startAnimation } from "shared/effects/animations";
import { isLocalPlr } from "shared/hooks/components";
import { routes } from "shared/network";
import { State } from "shared/state";

let startTime = 0;

function interacting(w: World, s: State, remoteToken: string) {
    for (const [e, interactingRecord] of w.queryChanged(Interacting)) {
        if (!w.contains(e)) continue;
        if (!isLocalPlr(w, e)) continue;

        const interacting = interactingRecord.new;
        if (!interacting) continue;

        const serverE = s.clientToServerEntityIdMap.get(tostring(interacting.interactE));
        if (serverE === undefined) continue;

        startTime = tick();
        routes.playerInteract.send(remoteToken, serverE, "harvest");

        const animatable = w.get(e, Animatable);
        if (animatable !== undefined) {
            startAnimation(animatable.animator, "harvest", "Action", 1, false);
        }
    }

    if (tick() > startTime + 0.5) {
        for (const [e, localPlr, interacting] of w.query(LocalPlr, Interacting)) {
            w.remove(e, Interacting);
        }
    }
}

export = interacting;
