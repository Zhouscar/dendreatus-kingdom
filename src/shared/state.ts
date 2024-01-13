import { AnyEntity } from "@rbxts/matter";
import { Host } from "type";

export type ClientState = "game" | "inventory" | "death";

export class State {
    debugEnabled: boolean = false;
    host: Host = "UNKNOWN";

    serverToClientEntityIdMap: Map<string, AnyEntity> = new Map();
    clientToServerEntityIdMap: Map<string, AnyEntity> = new Map();

    canOpenInventory: boolean = false;

    clientState: ClientState = "game";

    bloodDrips: Set<[BasePart, Instance]> = new Set();
}
