import { AnyEntity } from "@rbxts/matter";

export type ClientState = "game" | "inventory" | "death";

export class State {
    debugEnabled: boolean = false;

    serverToClientEntityIdMap: Map<string, AnyEntity> = new Map();
    clientToServerEntityIdMap: Map<string, AnyEntity> = new Map();

    canOpenInventory: boolean = false;

    clientState: ClientState = "game";

    cameraShake: number = 0;
}
