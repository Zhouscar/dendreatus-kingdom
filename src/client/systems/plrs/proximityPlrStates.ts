import { World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { store } from "client/store";
import { LocalPlr, Plr, Transform } from "shared/components";

function proximityPlrStates(w: World) {
    const ecsState = store.getState().ecsSlice;

    const characterCF = (() => {
        for (const [e, localPlr, transform] of w.query(LocalPlr, Transform)) {
            return transform.cf;
        }
        return undefined;
    })();

    if (characterCF === undefined) {
        if (!ecsState.proximityPlrEs.isEmpty()) {
            store.setProximityPlrEs(new Map());
        }
        return;
    }

    const oldProximityPlrEs = ecsState.proximityPlrEs;
    const newProximityPlrEs: typeof oldProximityPlrEs = new Map();

    for (const [e, transform, plr] of w.query(Transform, Plr)) {
        const cf = transform.cf;
        const distance = cf.Position.sub(characterCF.Position).Magnitude;
        if (distance > 50) continue;

        const isShowing = distance < 30;

        newProximityPlrEs.set(tostring(e), isShowing);
    }

    if (!Sift.Dictionary.equals(oldProximityPlrEs, newProximityPlrEs)) {
        store.setProximityPlrEs(newProximityPlrEs);
    }
}

export = proximityPlrStates;
