import { current } from "@rbxts/immut";
import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { mainUiContainer } from "client/containers";
import HealthBar from "client/widgets/healthBar";
import { Plr } from "shared/components";
import { Health } from "shared/components/health";
import { State } from "shared/state";

function treeConstructor(current: number, maximum: number, enabled: boolean) {
    return (
        <HealthBar
            Size={new UDim2(0.5, 0, 0, 20)}
            Position={new UDim2(0.5, 0, 1, -50)}
            AnchorPoint={new Vector2(0.5, 0)}
            current={current}
            maximum={maximum}
            enabled={enabled}
        ></HealthBar>
    );
}

const tree = Roact.mount(treeConstructor(100, 100, false), mainUiContainer);

function healthBar(w: World, s: State) {
    let current = undefined;
    let maximum = undefined;
    const enabled = s.clientState === "game";

    for (const [e, plr, health] of w.query(Plr, Health)) {
        if (plr.player !== Players.LocalPlayer) continue;

        current = health.current;
        maximum = health.maximum;
        break;
    }

    if (!useChange([current, maximum, enabled])) return;
    if (current === undefined) return;
    if (maximum === undefined) return;

    Roact.update(tree, treeConstructor(current, maximum, enabled));
}

export = healthBar;
