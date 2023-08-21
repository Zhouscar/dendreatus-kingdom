import { ReplicatedStorage } from "@rbxts/services";
import { start } from "shared/start";

start(
    "CLIENT",
    [ReplicatedStorage.client.systems, ReplicatedStorage.shared.systems],
    [ReplicatedStorage.client.plugins, ReplicatedStorage.shared.plugins],
);
