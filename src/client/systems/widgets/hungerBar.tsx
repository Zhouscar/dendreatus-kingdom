import { current } from "@rbxts/immut";
import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { mainUiContainer } from "client/containers";
import HealthBar from "client/apps/healthBar";
import { LocalPlr, Plr } from "shared/components";
import { Health } from "shared/components/health";
import { State } from "shared/state";
import HungerBar from "client/apps/hungerBar";
import { Stomach } from "shared/components/hunger";

function treeConstructor(current: number, maximum: number, enabled: boolean) {
    return (
        <HungerBar
            Size={new UDim2(0.5, 0, 0, 20)}
            Position={new UDim2(0.5, 0, 1, -20)}
            AnchorPoint={new Vector2(0.5, 0)}
            current={current}
            maximum={maximum}
            enabled={enabled}
        ></HungerBar>
    );
}

const tree = Roact.mount(treeConstructor(100, 100, false), mainUiContainer);

function healthBar(w: World, s: State) {
    let current = undefined;
    let maximum = undefined;
    const enabled = s.clientState === "game";

    for (const [e, localPlr, stomach] of w.query(LocalPlr, Stomach)) {
        current = stomach.hunger;
        maximum = stomach.capacity;
        break;
    }

    if (!useChange([current, maximum, enabled])) return;
    if (current === undefined) return;
    if (maximum === undefined) return;

    Roact.update(tree, treeConstructor(current, maximum, enabled));
}

export = healthBar;
