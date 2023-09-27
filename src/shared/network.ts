import {
    Client as ServerToClient,
    Server as ClientToServer,
    createRemotes,
    namespace,
    remote,
} from "@rbxts/remo";
import { ReplicationMap } from "./components/serde";
import { BroadcastAction } from "@rbxts/reflex";
import { t } from "@rbxts/t";
import { SoundContext } from "types";
import { $terrify } from "rbxts-transformer-t";

const isSoundContext = $terrify<SoundContext>();

export const network = createRemotes({
    replication: remote<ServerToClient, [ReplicationMap]>(),
    reflex: namespace({
        start: remote<ClientToServer>(),
        dispatch: remote<ServerToClient, [BroadcastAction[]]>(),
    }),

    playerPlaySound: remote<ClientToServer, [number, SoundContext, CFrame]>(
        t.number,
        isSoundContext,
        t.CFrame,
    ),
});
