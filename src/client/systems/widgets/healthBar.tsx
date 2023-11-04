import { current } from "@rbxts/immut";
import { World } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { mainUiContainer } from "client/containers";
import HealthBar from "client/widgets/healthBar";
import { Plr } from "shared/components";
import { Health } from "shared/components/health";

function treeConstructor(current: number, maximum: number) {
    return (
        <HealthBar
            Size={new UDim2(0.5, 0, 0, 20)}
            Position={new UDim2(0.5, 0, 1, -50)}
            AnchorPoint={new Vector2(0.5, 0)}
            current={current}
            maximum={maximum}
        ></HealthBar>
    );
}

const tree = Roact.mount(treeConstructor(100, 100), mainUiContainer);

function healthBar(w: World) {
    for (const [e, healthRecord] of w.queryChanged(Health)) {
        if (!w.contains(e)) continue;
        const health = healthRecord.new!;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        Roact.update(tree, treeConstructor(health.current, health.maximum));

        break;
    }
}

export = healthBar;
