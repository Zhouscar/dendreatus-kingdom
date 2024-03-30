import { Configuration, Route } from "@rbxts/yetanothernet";
import { ReplicationMap, SyncMap } from "./components/serde";
import { BroadcastAction } from "@rbxts/reflex";
import { AnyEntity } from "@rbxts/matter";
import { ItemType } from "./features/items/types";
import {
    Client as ServerToClient,
    Server as ClientToServer,
    createRemotes,
    namespace,
    remote,
} from "@rbxts/remo";
import { t } from "@rbxts/t";

const defaultConfiguration: Configuration = {
    Channel: "Reliable",
    Event: "default",
};

export const remos = createRemotes({
    reflexCore: namespace({
        start: remote<ClientToServer>(),
        dispatch: remote<ServerToClient, [BroadcastAction[]]>(),
    }),

    store: namespace({
        swapItems: remote<ClientToServer, [number, number]>(t.number, t.number),
    }),
});

export const routes = {
    ecsReplication: new Route<[ReplicationMap]>(defaultConfiguration),

    ecsSync: new Route<[SyncMap]>(defaultConfiguration),

    playerDamage: new Route<[AnyEntity, ItemType]>(defaultConfiguration),
};
