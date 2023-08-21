import { AnyEntity } from "@rbxts/matter";
import { Host } from "types";

export class State {
    debugEnabled: boolean = false;
    host: Host = "UNKNOWN";
    serverToClientEntityIdMap: Map<string, AnyEntity> = new Map();
    clientToServerEntityIdMap: Map<string, AnyEntity> = new Map();
}
