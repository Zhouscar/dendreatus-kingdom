import { Make } from "@rbxts/altmake";
import { Players } from "@rbxts/services";

export const mainUiContainer = Make("ScreenGui", {
    Name: "MainUiContainer",
    Parent: Players.LocalPlayer.PlayerGui,
});
