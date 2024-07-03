import { AnyEntity } from "@rbxts/matter";

export type ClientState = "game" | "inventory" | "death" | "title" | "spawning" | "chat";

export class State {
    debugEnabled: boolean = false;

    plrGroupDatas: Map<Player, { role: string; rank: number }> = new Map();

    serverToClientEntityIdMap: Map<string, AnyEntity> = new Map();
    clientToServerEntityIdMap: Map<string, AnyEntity> = new Map();

    canOpenInventory: boolean = false;

    clientState: ClientState = "title";

    cameraShake: number = 0;
}
