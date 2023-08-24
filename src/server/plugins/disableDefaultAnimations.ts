import { StarterPlayer } from "@rbxts/services";

function disableDefaultAnimations() {
    const overrideAnimate = new Instance("Script");
    overrideAnimate.Name = "Animate";
    overrideAnimate.Parent = StarterPlayer.StarterCharacterScripts;
}

export = disableDefaultAnimations;
