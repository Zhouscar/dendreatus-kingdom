import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import Roact from "@rbxts/roact";
import { mainUiContainer } from "client/containers";
import Inventory from "client/apps/inventory";
import { State } from "shared/state";

function treeConstructor(enabled: boolean) {
    return <Inventory enabled={enabled}></Inventory>;
}
//testing
const tree = Roact.mount(treeConstructor(false), mainUiContainer);

function inventory(w: World, s: State) {
    const enabled = s.clientState === "inventory";

    if (!useChange([enabled])) return;

    Roact.update(tree, treeConstructor(enabled));
}

export = inventory;
