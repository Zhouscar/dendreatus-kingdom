import { AnyEntity, World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import Hotbar from "client/apps/hotbar";
import { mainUiContainer } from "client/containers";
import { LocalPlr, Plr } from "shared/components";
import { EquippingByIndex } from "shared/components/items";
import { State } from "shared/state";

function treeConstructor(enabled: boolean, indexEquipped: number | undefined) {
    return <Hotbar enabled={enabled} indexEquipped={indexEquipped}></Hotbar>;
}

const tree = Roact.mount(treeConstructor(false, undefined), mainUiContainer);

function hotbar(w: World, s: State) {
    const enabled = s.clientState === "game";
    let indexEquipped = undefined;

    for (const [e, localPlr, equippingByIndex] of w.query(LocalPlr, EquippingByIndex)) {
        indexEquipped = equippingByIndex.index;
    }

    if (!useChange([enabled, indexEquipped])) return;

    Roact.update(tree, treeConstructor(enabled, indexEquipped));
}

export = hotbar;
