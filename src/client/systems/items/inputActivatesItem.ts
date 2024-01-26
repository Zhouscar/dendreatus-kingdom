import { World, useEvent } from "@rbxts/matter";
import { Players, UserInputService } from "@rbxts/services";
import { localPlr } from "client/localPlr";
import { store } from "client/store";
import { Plr } from "shared/components";
import { ActivatingItem, Equipping } from "shared/components/items";

function isMB1(input: InputObject) {
    return input.UserInputType === Enum.UserInputType.MouseButton1;
}

function getItem(guid: string) {
    return store.getState().players.inventory[localPlr]?.items.get(guid);
}

function activateItem(w: World) {
    for (const [e, plr, equipping] of w.query(Plr, Equipping)) {
        if (plr.player !== Players.LocalPlayer) continue;
        const item = getItem(equipping.itemGuid);
        if (item === undefined) continue;
        w.insert(e, ActivatingItem({ elapsed: 0, item: item }));
    }
}

function deactivateItem(w: World) {
    for (const [e, plr, _equipping, _activatingItem] of w.query(Plr, Equipping, ActivatingItem)) {
        if (plr.player !== Players.LocalPlayer) continue;
        w.remove(e, ActivatingItem);
    }
}

function inputActivatesItem(w: World) {
    for (const [_, input, gPE] of useEvent(UserInputService, "InputBegan")) {
        if (!isMB1(input)) continue;
        if (gPE) continue;
        activateItem(w);
    }

    for (const [_, input, gPE] of useEvent(UserInputService, "InputChanged")) {
        if (!isMB1(input)) continue;
        if (gPE) {
            deactivateItem(w);
        } else {
            activateItem(w);
        }
    }

    for (const [_, input, gPE] of useEvent(UserInputService, "InputEnded")) {
        if (!isMB1(input)) continue;
        if (gPE) continue;
        deactivateItem(w);
    }
}

export = inputActivatesItem;
