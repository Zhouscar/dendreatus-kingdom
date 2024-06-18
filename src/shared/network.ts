import { Configuration, Route } from "@rbxts/yetanothernet";
import { ReplicationMap, SyncMap } from "./components/serde";
import { BroadcastAction } from "@rbxts/reflex";
import {
    Client as ServerToClient,
    Server as ClientToServer,
    createRemotes,
    namespace,
    remote,
} from "@rbxts/remo";
import { t } from "@rbxts/t";
import { Make } from "@rbxts/altmake";
import { ReplicatedStorage } from "@rbxts/services";
import { newGuid } from "./features/guidUtils";
import { HOST } from "./host";

type Token = string;

export const _remoteToken: string = HOST === "SERVER" ? newGuid() : "NA";

export const requestRemoteToken =
    HOST === "SERVER"
        ? Make("RemoteFunction", {
              Parent: ReplicatedStorage,
              Name: "RequestRemoteToken",
          })
        : (ReplicatedStorage.WaitForChild("RequestRemoteToken") as RemoteFunction);

if (HOST === "SERVER") {
    const requestedPlayers: Set<Player> = new Set();
    requestRemoteToken.OnServerInvoke = (player) => {
        if (requestedPlayers.has(player)) {
            player.Kick("HAHA YOU HACKER");
            return "NA";
        }
        requestedPlayers.add(player);
        return _remoteToken;
    };
}

const defaultConfiguration: Configuration = {
    Channel: "Reliable",
    Event: "default",
};

export const remos = createRemotes({
    reflexCore: namespace({
        start: remote<ClientToServer, []>(),
        dispatch: remote<ServerToClient, [BroadcastAction[]]>(),
    }),

    store: namespace({
        swapItems: remote<ClientToServer, [number, number]>(t.number, t.number),
    }),
});

export const routes = {
    ecsReplication: new Route<[ReplicationMap]>(defaultConfiguration),

    ecsRequestPayload: new Route<[Token]>(defaultConfiguration),

    ecsSync: new Route<[Token, SyncMap]>(defaultConfiguration),

    requestSpawn: new Route<[Token]>(defaultConfiguration),
};
