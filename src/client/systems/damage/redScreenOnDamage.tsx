import { Make } from "@rbxts/altmake";
import { World, useDeltaTime } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import EntireScreen from "client/apps/components/entireScreen";
import { Plr } from "shared/components";
import { Damage } from "shared/components/health";

const redScreenOnDamageContainer = Make("ScreenGui", {
    Name: "RedScreenOnDamageContainer",
    ResetOnSpawn: false,
    Parent: Players.LocalPlayer!.PlayerGui,
});

function RedScreen(props: { enability: number }) {
    return (
        <EntireScreen handleInset={true}>
            <frame
                BorderSizePixel={0}
                Size={new UDim2(1, 0, 1, 0)}
                BackgroundColor3={Color3.fromRGB(150, 0, 0)}
                BackgroundTransparency={1 - props.enability}
            ></frame>
        </EntireScreen>
    );
}

withHookDetection(Roact);
const tree = Roact.mount(<RedScreen enability={0}></RedScreen>, redScreenOnDamageContainer);

const DECAY_ALPHA = 2;

let enability = 0;

function redScreenOnDamage(w: World) {
    let newEnability = math.max(0, enability - useDeltaTime() * DECAY_ALPHA);

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        newEnability = 0.7;
    }

    if (enability === newEnability) return;
    enability = newEnability;
    Roact.update(tree, <RedScreen enability={enability}></RedScreen>);
}

export = redScreenOnDamage;
