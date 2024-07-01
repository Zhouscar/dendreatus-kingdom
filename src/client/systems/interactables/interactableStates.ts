import { AnyEntity, World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { store } from "client/store";
import { LocalPlr, Renderable, Transform } from "shared/components";
import { Acting } from "shared/components/actions";
import {
    CannotInteract,
    CannotInteractReason,
    Interactable,
    LocalCannotInteract,
} from "shared/components/interactables";
import { CrashLanding, Falling, Jumping } from "shared/components/movements";
import { InteractState } from "shared/features/interactables/types";
import { hasOneOfComponents } from "shared/hooks/components";

function canInteract(w: World) {
    for (const [e] of w.query(LocalPlr)) {
        return !hasOneOfComponents(w, e, CrashLanding, Acting, Jumping, Falling);
    }
}

function interactableStates(w: World) {
    const ecsState = store.getState().ecsSlice;

    const characterCF = (() => {
        for (const [e, localPlr, transform] of w.query(LocalPlr, Transform)) {
            return transform.cf;
        }
        return undefined;
    })();

    if (characterCF === undefined) {
        if (!ecsState.interactEs.isEmpty()) {
            store.setInteractEs(new Map());
        }
        return;
    }

    const oldInteractEs = ecsState.interactEs;
    const newInteractEs: typeof oldInteractEs = new Map();

    let showingE: AnyEntity | undefined = undefined;
    let showingECannotInteractReason: CannotInteractReason | "NONE" = "NONE";
    let showingEDistance = math.huge;

    for (const [e, transform, interactable] of w.query(Transform, Interactable)) {
        const cf = transform.cf;
        const distance = cf.Position.sub(characterCF.Position).Magnitude;
        const dot = (() => {
            const u = characterCF.LookVector;
            const v = cf.Position.sub(characterCF.Position).Unit;
            return u.Dot(v);
        })();

        if (distance > 50) continue;

        const cannotInteract = w.get(e, CannotInteract);
        const localCannotInteract = w.get(e, LocalCannotInteract);

        let reason: CannotInteractReason | "NONE" = "NONE";
        if (cannotInteract !== undefined) {
            reason = cannotInteract.reason;
        } else if (localCannotInteract !== undefined) {
            reason = localCannotInteract.reason;
        }

        const isHidden = distance > 20;

        if (distance < 10 && dot > 0.2 && distance < showingEDistance) {
            showingE = e;
            showingEDistance = distance;
            showingECannotInteractReason = reason;
        }

        const interactState: InteractState = isHidden ? "hidden" : "hinting";
        newInteractEs.set(tostring(e), [interactState, reason]);
    }

    if (showingE !== undefined && canInteract(w)) {
        newInteractEs.set(tostring(showingE), ["showing", showingECannotInteractReason]);
    }

    if (!Sift.Dictionary.equals(newInteractEs, oldInteractEs)) {
        store.setInteractEs(newInteractEs);
    }
}

export = interactableStates;
