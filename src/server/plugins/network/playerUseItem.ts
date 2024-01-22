import { AnyEntity, World } from "@rbxts/matter";
import { store } from "server/store";
import findPlrE from "shared/calculations/findPlrE";
import { Equipping, ActivatingItem } from "shared/components/items";
import { network } from "shared/network";

function getItem(w: World, plrE: AnyEntity, plr: string) {
    const guid = w.get(plrE, Equipping)?.itemGuid;
    if (guid === undefined) return undefined;
    return store.getState().players.inventory[plr]?.items.get(guid);
}

function playerUseItem(w: World) {
    network.ecs.playerUseItem.connect((player, startTime) => {
        // it is currently using the client startTime, so I'm not if it is gonna lead to some compromises
        const e = findPlrE(w, player);
        assert(e);

        if (startTime === undefined) {
            w.remove(e, ActivatingItem);
            return;
        }

        const item = getItem(w, e, tostring(player.UserId));

        if (item) {
            w.insert(e, ActivatingItem({ startTime: startTime, item: item }));
        }
    });
}

export = playerUseItem;
