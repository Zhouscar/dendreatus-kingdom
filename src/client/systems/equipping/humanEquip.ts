import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import { Human, Plr } from "shared/components";
import { Equipping } from "shared/components/items";

function humanEquip(w: World) {
    for (const [e, plr, human] of w.query(Plr, Human)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const guid = w.get(e, Equipping)?.itemGuid;

        if (guid === undefined) {
            human.humanoid.UnequipTools();
            continue;
        }

        const tool = Players.LocalPlayer.Backpack.FindFirstChild(guid);
        if (!tool) continue;
        if (!tool.IsA("Tool")) continue;

        human.humanoid.EquipTool(tool);
    }
}

export = humanEquip;
