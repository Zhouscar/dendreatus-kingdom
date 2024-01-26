import { AnyEntity, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Acting } from "shared/components/actions";
import { EquippingByIndex } from "shared/components/items";
import { hasComponents } from "shared/hooks/components";
import { getKeysJustPressed } from "shared/hooks/keyInput";
import { State } from "shared/state";

function forLocalPlayer(w: World, callback: (e: AnyEntity) => void) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;
        callback(e);
        return;
    }
}

function equipInput(w: World, s: State) {
    if (s.clientState !== "game") return;

    forLocalPlayer(w, (e) => {
        if (hasComponents(w, e, Acting)) return;

        const keysJustPressed = getKeysJustPressed();
        const equippingByIndex = w.get(e, EquippingByIndex);
        if (keysJustPressed.includes("hotbar1")) {
            if (equippingByIndex?.index === 0) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 0 }));
        }
        if (keysJustPressed.includes("hotbar2")) {
            if (equippingByIndex?.index === 1) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 1 }));
        }
        if (keysJustPressed.includes("hotbar3")) {
            if (equippingByIndex?.index === 2) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 2 }));
        }
        if (keysJustPressed.includes("hotbar4")) {
            if (equippingByIndex?.index === 3) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 3 }));
        }
        if (keysJustPressed.includes("hotbar5")) {
            if (equippingByIndex?.index === 4) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 4 }));
        }
        if (keysJustPressed.includes("hotbar6")) {
            if (equippingByIndex?.index === 5) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 5 }));
        }
        if (keysJustPressed.includes("hotbar7")) {
            if (equippingByIndex?.index === 6) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 6 }));
        }
        if (keysJustPressed.includes("hotbar8")) {
            if (equippingByIndex?.index === 7) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 7 }));
        }
        if (keysJustPressed.includes("hotbar9")) {
            if (equippingByIndex?.index === 8) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 8 }));
        }
        if (keysJustPressed.includes("hotbar10")) {
            if (equippingByIndex?.index === 9) w.remove(e, EquippingByIndex);
            else w.insert(e, EquippingByIndex({ index: 9 }));
        }
    });
}

export = equipInput;
