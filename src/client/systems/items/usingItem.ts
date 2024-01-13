import { AnyEntity, World, useEvent } from "@rbxts/matter";
import { Players, UserInputService } from "@rbxts/services";
import { localPlr } from "client/localPlr";
import { RootState, store } from "client/store";
import findPlrE from "shared/calculations/findPlrE";
import { Equipping, UsingItem } from "shared/components/items";
import { State } from "shared/state";

function getItem(w: World, plrE: AnyEntity, state: RootState) {
    const guid = w.get(plrE, Equipping)?.itemGuid;
    if (guid === undefined) return undefined;
    return state.players.inventory[localPlr]?.items.get(guid);
}

function useItem(w: World, s: State) {
    for (const [e, usingItem] of w.query(UsingItem)) {
        print(usingItem.startTime);
    }

    const plrE = findPlrE(w, Players.LocalPlayer);
    if (plrE === undefined) return;
    const state = store.getState();

    if (s.clientState !== "game") {
        w.remove(plrE, UsingItem);
        return;
    }

    for (const [_, input, gPE] of useEvent(UserInputService, "InputBegan")) {
        if (input.UserInputType !== Enum.UserInputType.MouseButton1) continue;
        if (gPE) continue;

        const item = getItem(w, plrE, state);
        if (item) {
            w.insert(plrE, UsingItem({ item: item, startTime: os.clock(), predicting: true }));
        }
    }

    for (const [_, input, gPE] of useEvent(UserInputService, "InputChanged")) {
        if (input.UserInputType !== Enum.UserInputType.MouseButton1) continue;
        if (gPE) {
            w.remove(plrE, UsingItem);
        } else {
            const item = getItem(w, plrE, state);
            if (item) {
                w.insert(plrE, UsingItem({ item: item, startTime: os.clock(), predicting: true }));
            }
        }
    }

    for (const [_, input, gPE] of useEvent(UserInputService, "InputEnded")) {
        if (input.UserInputType !== Enum.UserInputType.MouseButton1) continue;
        if (gPE) continue;

        w.remove(plrE, UsingItem);
    }
}

export = useItem;
