import { AnyEntity, World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { store } from "client/store";
import { LocalPlr, Renderable } from "shared/components";
import { Acting } from "shared/components/actions";
import {
    CannotInteract,
    CannotInteractReason,
    Interactable,
    Interacting,
} from "shared/components/interactables";
import { CrashLanding, Falling, Jumping } from "shared/components/movements";
import { InteractState } from "shared/features/interactables/types";
import { hasOneOfComponents } from "shared/hooks/components";
import { State } from "shared/state";

function canInteract(w: World) {
    for (const [e] of w.query(LocalPlr)) {
        return !hasOneOfComponents(w, e, CrashLanding, Interacting, Acting, Jumping, Falling);
    }
}

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
    let showingECannotInteractReason: CannotInteractReason | undefined = undefined;
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

        const cannotInteract = w.get(e, CannotInteract);

        const isHidden = distance > 20;

        if (distance < 10 && dot > 0.2 && distance < showingEDistance) {
            showingE = e;
            showingEDistance = distance;
            showingECannotInteractReason = cannotInteract?.reason;
        }

        const interactState: InteractState = isHidden ? "hidden" : "hinting";
        newInteractEs.set(e, [interactState, cannotInteract?.reason]);
    }

    if (showingE !== undefined && canInteract(w)) {
        newInteractEs.set(showingE, ["showing", showingECannotInteractReason]);
    }

    if (!Sift.Dictionary.equals(newInteractEs, oldInteractEs)) {
        store.setInteractEs(newInteractEs);
    }
}

export = interactableStates;
