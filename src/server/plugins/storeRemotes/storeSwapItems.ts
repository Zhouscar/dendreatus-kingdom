import { store } from "server/store";
import { remos } from "shared/routes";

function storeSwapItems() {
    remos.store.swapItems.connect((player, from, to) => {
        const plr = tostring((player as Player).UserId);

        store.swapItems(plr, from, to);
    });
}

export = storeSwapItems;
