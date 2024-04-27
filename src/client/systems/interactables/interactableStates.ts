import { AnyEntity, World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { store } from "client/store";
import { Renderable } from "shared/components";
import { Interactable } from "shared/components/interactables";
import { InteractState } from "shared/features/interactables/types";
import { State } from "shared/state";

function interactableStates(w: World, s: State) {
    const ecsState = store.getState().ecsSlice;

    if (!s.characterCF) {
        if (!ecsState.interactEs.isEmpty()) {
            store.setInteractEs(new Map());
        }
        return;
    }

    const oldInteractEs = ecsState.interactEs;
    const newInteractEs: typeof oldInteractEs = new Map();

    let showingE: AnyEntity | undefined = undefined;
    let showingEDistance = math.huge;

    for (const [e, renderable, interactable] of w.query(Renderable, Interactable)) {
        const cf = renderable.model.GetPivot();
        const distance = s.characterCF.Position.sub(cf.Position).Magnitude;
        const dot = (() => {
            const u = s.characterCF.LookVector;
            const v = cf.Position.sub(s.characterCF.Position).Unit;
            return u.Dot(v);
        })();

        if (distance > 50) continue;

        const isHidden = distance > 20;

        if (distance < 10 && dot > 0.2 && distance < showingEDistance) {
            showingE = e;
            showingEDistance = distance;
        }

        const interactState: InteractState = isHidden ? "hidden" : "hinting";
        newInteractEs.set(e, interactState);
    }

    if (showingE !== undefined) {
        newInteractEs.set(showingE, "showing");
    }

    if (!Sift.Dictionary.equals(newInteractEs, oldInteractEs)) {
        store.setInteractEs(newInteractEs);
    }
}

export = interactableStates;
