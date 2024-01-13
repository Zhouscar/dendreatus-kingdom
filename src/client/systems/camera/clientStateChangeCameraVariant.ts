import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import { store } from "client/store";
import { CameraVariant } from "client/store/camera";
import { ViewVector } from "shared/classes";
import { Plr, Renderable } from "shared/components";
import { ClientState, State } from "shared/state";

function findTrackPart(model: Model) {
    return model.FindFirstChild("Head") as BasePart;
}

function doGameClientState(w: World, clientState: ClientState) {
    let target: BasePart | undefined = undefined;

    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        target = findTrackPart(renderable.model);
    }

    if (!useChange([target, clientState], "Game")) return;

    if (target === undefined) {
        store.switchCamera(CameraVariant.none({}));
        return;
    }

    store.switchCamera(CameraVariant.track({ target: target }));
}

const INVENTORY_ANGLE_VIEW = new ViewVector(5, 0, 0);

function doInventoryClientState(w: World, clientState: ClientState) {
    let target: BasePart | undefined = undefined;

    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        target = renderable.model.PrimaryPart;
    }

    if (!useChange([target, clientState], "Inventory")) return;

    if (target === undefined) {
        store.switchCamera(CameraVariant.none({}));
        return;
    }

    store.switchCamera(CameraVariant.view({ viewVector: INVENTORY_ANGLE_VIEW, target: target }));
}

const DEATH_ANGLE_VIEW = new ViewVector(20, 0, 0);

function doDeathClientState(w: World, clientState: ClientState) {
    let target: BasePart | undefined = undefined;

    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        target = renderable.model.FindFirstChild("Head") as BasePart | undefined;
    }

    if (!useChange([target, clientState], "Inventory")) return;

    if (target === undefined) {
        store.switchCamera(CameraVariant.none({}));
        return;
    }

    store.switchCamera(CameraVariant.view({ viewVector: DEATH_ANGLE_VIEW, target: target }));
}

function clientStateChangeCameraVariant(w: World, s: State) {
    switch (s.clientState) {
        case "game":
            doGameClientState(w, s.clientState);
            break;
        case "inventory":
            doInventoryClientState(w, s.clientState);
            break;
        case "death":
            doDeathClientState(w, s.clientState);
            break;
    }
}

export = clientStateChangeCameraVariant;
