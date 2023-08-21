import { ReplicatedStorage, ServerScriptService } from "@rbxts/services";
import { start } from "shared/start";

start(
    "SERVER",
    [ServerScriptService.server.systems, ReplicatedStorage.shared.systems],
    [ServerScriptService.server.plugins, ReplicatedStorage.shared.plugins],
);
