import { StarterGui } from "@rbxts/services";

function disableDefaultBackpackGui() {
    StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);
}

export = disableDefaultBackpackGui;
