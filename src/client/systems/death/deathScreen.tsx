import { Make } from "@rbxts/altmake";
import { World } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import DeathScreen from "client/apps/deathScreen";
import { State } from "shared/state";

let isDead = false;

const deathScreenContainer = Make("ScreenGui", {
    Name: "DeathScreenContainer",
    Parent: Players.LocalPlayer!.PlayerGui,
    ResetOnSpawn: false,
});

withHookDetection(Roact);
function deathScreen(w: World, s: State) {
    if (s.clientState !== "death") return;
    if (isDead) return;
    isDead = true;

    Roact.mount(<DeathScreen></DeathScreen>, deathScreenContainer, "DeathScreen");
}

export = deathScreen;
