import { AnyEntity } from "@rbxts/matter";

export type ClientState = "game" | "inventory" | "death" | "title" | "intro";

export class State {
    debugEnabled: boolean = false;

    serverToClientEntityIdMap: Map<string, AnyEntity> = new Map();
    clientToServerEntityIdMap: Map<string, AnyEntity> = new Map();

    canOpenInventory: boolean = false;

    clientState: ClientState = "title";

    cameraShake: number = 0;
}
