import { Players } from "@rbxts/services";

export const mainUiContainer = new Instance("ScreenGui");
mainUiContainer.Name = "MainUiContainer";
mainUiContainer.Parent = Players.LocalPlayer.PlayerGui;
