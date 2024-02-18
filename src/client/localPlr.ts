import { Players, RunService } from "@rbxts/services";

export const theLocalPlr =
    Players.LocalPlayer !== undefined ? tostring(Players.LocalPlayer.UserId) : "NONE";
