import { AnyEntity } from "@rbxts/matter";

export type ClientState = "game" | "inventory" | "death";

export class State {
    characterCF: CFrame | undefined = undefined;

    debugEnabled: boolean = false;

    serverToClientEntityIdMap: Map<string, AnyEntity> = new Map();
    clientToServerEntityIdMap: Map<string, AnyEntity> = new Map();

    canOpenInventory: boolean = false;

    clientState: ClientState = "game";

    bloodDrips: Set<[BasePart, Instance]> = new Set();
}
