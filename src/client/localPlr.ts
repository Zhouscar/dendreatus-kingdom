import { Players, RunService } from "@rbxts/services";

export const localPlr =
    Players.LocalPlayer !== undefined ? tostring(Players.LocalPlayer.UserId) : "NONE";
