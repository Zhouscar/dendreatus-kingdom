import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import { Human, LocalPlr, Plr } from "shared/components";
import { Equipping } from "shared/components/items";

function humanEquip(w: World) {
    for (const [e, localPlr, human] of w.query(LocalPlr, Human)) {
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
