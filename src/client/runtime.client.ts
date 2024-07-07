import Roact from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { start } from "shared/start";
import loadGame from "./loadGame";

loadGame();

withHookDetection(Roact);
start(
    [ReplicatedStorage.client.systems, ReplicatedStorage.shared.systems],
    [ReplicatedStorage.client.plugins, ReplicatedStorage.shared.plugins],
);
