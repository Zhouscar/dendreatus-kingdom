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
import { SoundContext } from "type";

function isSoundContext(value: unknown): value is SoundContext {
    return t.strictInterface({
        volume: t.number,
        soundId: t.string,
        speed: t.number,
    })(value);
}

export const network = createRemotes({
    replication: remote<ServerToClient, [ReplicationMap]>(),

    ecs: namespace({
        playerEquip: remote<ClientToServer, [string | undefined]>(t.optional(t.string)),
        playerUseItem: remote<ClientToServer, [number | undefined]>(t.optional(t.number)),
    }),

    reflex: namespace({
        start: remote<ClientToServer>(),
        dispatch: remote<ServerToClient, [BroadcastAction[]]>(),
    }),

    store: namespace({
        swapItems: remote<ClientToServer, [number, number]>(t.number, t.number),
    }),

    playerPlaySound: remote<ClientToServer, [number, SoundContext, CFrame]>(
        t.number,
        isSoundContext,
        t.CFrame,
    ),
});
