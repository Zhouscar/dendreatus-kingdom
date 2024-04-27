import { RunService } from "@rbxts/services";

export const HOST = RunService.IsClient() ? "CLIENT" : RunService.IsServer() ? "SERVER" : "UNKNOWN";
