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
import { AnyEntity } from "@rbxts/matter";
import { ItemType, isItemType } from "./features/items/types";

function isSoundContext(value: unknown): value is SoundContext {
    return t.strictInterface({
        volume: t.number,
        soundId: t.string,
        speed: t.number,
    })(value);
}

function isEntity(value: unknown): value is AnyEntity {
    return t.number(value);
}

export const network = createRemotes({
    replication: remote<ServerToClient, [ReplicationMap]>(),

    ecs: namespace({
        playerEquip: remote<ClientToServer, [string | undefined]>(t.optional(t.string)),
        playerUseItem: remote<ClientToServer, [number, number]>(t.number, t.number),

        playerDamage: remote<ClientToServer, [AnyEntity, ItemType]>(isEntity, isItemType),
        playerDigest: remote<ClientToServer, [string, number]>(t.string, t.number),
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
