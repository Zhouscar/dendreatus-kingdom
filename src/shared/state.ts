import { AnyEntity } from "@rbxts/matter";

export type ClientState = "game" | "inventory" | "death" | "title" | "spawning" | "chat" | "sign";

export class State {
    debugEnabled: boolean = false;

    plrGroupDatas: Map<Player, { role: string; rank: number }> = new Map();

    serverToClientEMap: Map<string, AnyEntity> = new Map();
    clientToServerEMap: Map<string, AnyEntity> = new Map();
    unsuccessfulTagEs: AnyEntity[] = [];

    canOpenInventory: boolean = false;

    clientState: ClientState = "title";

    trauma: number = 0;
    healthPerc: number = 1;
}
