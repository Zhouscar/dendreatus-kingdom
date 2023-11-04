import Roact from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import { ReplicatedStorage } from "@rbxts/services";
import { start } from "shared/start";

withHookDetection(Roact);
start(
    "CLIENT",
    [ReplicatedStorage.client.systems, ReplicatedStorage.shared.systems],
    [ReplicatedStorage.client.plugins, ReplicatedStorage.shared.plugins],
);
