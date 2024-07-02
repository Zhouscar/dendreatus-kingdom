import { Make } from "@rbxts/altmake";
import { Chat, StarterGui, StarterPlayer } from "@rbxts/services";

function disableDefaults() {
    Make("Script", {
        Name: "Animate",
        Parent: StarterPlayer.StarterCharacterScripts,
    });

    StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, false);
}

export = disableDefaults;
