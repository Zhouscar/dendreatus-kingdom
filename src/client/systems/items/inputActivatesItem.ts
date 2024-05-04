import { World, useEvent } from "@rbxts/matter";
import { Players, UserInputService } from "@rbxts/services";
import { theLocalPlr } from "client/localPlr";
import { store } from "client/store";
import { LocalPlr, Plr } from "shared/components";
import { ActivatingItem, Equipping } from "shared/components/items";

function isMB1(input: InputObject) {
    return input.UserInputType === Enum.UserInputType.MouseButton1;
}

function getItem(guid: string) {
    return store.getState().players.inventory[theLocalPlr]?.items.get(guid);
}

function activateItem(w: World) {
    for (const [e, localPlr, equipping] of w.query(LocalPlr, Equipping)) {
        const item = getItem(equipping.itemGuid);
        if (item === undefined) continue;
        w.insert(e, ActivatingItem({ startTime: tick(), item: item }));
    }
}

function deactivateItem(w: World) {
    for (const [e, localPlr, _equipping, _activatingItem] of w.query(
        LocalPlr,
        Equipping,
        ActivatingItem,
    )) {
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
