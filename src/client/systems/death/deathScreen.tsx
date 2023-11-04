import { World } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import DeathScreen from "client/widgets/deathScreen";
import { Plr } from "shared/components";
import { Dead } from "shared/components/health";

let isDead = false;

const deathScreenContainer = new Instance("ScreenGui");
deathScreenContainer.Name = "DeathScreenContainer";
deathScreenContainer.Parent = Players.LocalPlayer.PlayerGui;
deathScreenContainer.ResetOnSpawn = false;

withHookDetection(Roact);
function deathScreen(w: World) {
    for (const [e, plr, dead] of w.query(Plr, Dead)) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (isDead) continue;
        isDead = true;

        Roact.mount(<DeathScreen></DeathScreen>, deathScreenContainer, "DeathScreen");
    }
}

export = deathScreen;
