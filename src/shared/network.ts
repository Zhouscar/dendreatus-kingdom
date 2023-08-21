import { Client, Server, createRemotes, remote } from "@rbxts/remo";
import { ReplicationMap } from "./components/serde";

type ServerToClient = Client;
type ClientToServer = Server;

export const network = createRemotes({
    replication: remote<ServerToClient, [ReplicationMap]>(),
});
