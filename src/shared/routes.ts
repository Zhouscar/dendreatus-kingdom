import { Configuration, Route } from "@rbxts/yetanothernet";
import { ReplicationMap, SyncMap } from "./components/serde";
import { BroadcastAction } from "@rbxts/reflex";
import { AnyEntity } from "@rbxts/matter";
import { ItemType } from "./features/items/types";

const defaultConfiguration: Configuration = {
    Channel: "Reliable",
    Event: "default",
};

// TODO: rework the network
export const routes = {
    ecsReplication: new Route<[ReplicationMap]>(defaultConfiguration),

    ecsSync: new Route<[SyncMap]>(defaultConfiguration),

    playerDamage: new Route<[AnyEntity, ItemType]>(defaultConfiguration),

    reflexStart: new Route<[]>(defaultConfiguration),
    reflexDispatch: new Route<[BroadcastAction[]]>(defaultConfiguration),

    storeSwapItems: new Route<[number, number]>(defaultConfiguration),
};
