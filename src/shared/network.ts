import {
    Client as ServerToClient,
    Server as ClientToServer,
    createRemotes,
    namespace,
    remote,
} from "@rbxts/remo";
import { ReplicationMap } from "./components/serde";
import { BroadcastAction } from "@rbxts/reflex";

export const network = createRemotes({
    replication: remote<ServerToClient, [ReplicationMap]>(),
    reflex: namespace({
        start: remote<ClientToServer>(),
        dispatch: remote<ServerToClient, [BroadcastAction[]]>(),
    }),
});
