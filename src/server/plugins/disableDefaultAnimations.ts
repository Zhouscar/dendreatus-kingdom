import { Make } from "@rbxts/altmake";
import { StarterPlayer } from "@rbxts/services";

function disableDefaultAnimations() {
    Make("Script", {
        Name: "Animate",
        Parent: StarterPlayer.StarterCharacterScripts,
    });
}

export = disableDefaultAnimations;
