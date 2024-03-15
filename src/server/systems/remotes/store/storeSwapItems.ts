import { store } from "server/store";
import { routes } from "shared/routes";

function storeSwapItems() {
    for (const [pos, player, from, to] of routes.storeSwapItems.query()) {
        const plr = tostring((player as Player).UserId);

        store.swapItems(plr, from, to);
    }
}

export = storeSwapItems;
