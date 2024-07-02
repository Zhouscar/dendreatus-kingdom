import { Make } from "@rbxts/altmake";
import { Chat, StarterGui, StarterPlayer } from "@rbxts/services";

function disableDefaults() {
    StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, false);
}

export = disableDefaults;
