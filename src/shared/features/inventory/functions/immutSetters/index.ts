import immutConsumeItem from "./immutConsumeItem";
import immutInsertItem from "./immutInsertItem";
import immutModifyItemAtGuid from "./immutModifyItemAtGuid";
import immutPutItems from "./immutPutItems";
import immutRemoveItemAt from "./immutRemoveItemAt";
import immutRemoveItemByGuid from "./immutRemoveItemByGuid";
import immutSetItemAt from "./immutSetItemAt";
import immutSwapItems from "./immutSwapItems";
import immutTakeItems from "./immutTakeItems";

const inventoryImmutSetters = {
    immutConsumeItem,
    immutInsertItem,
    immutModifyItemAtGuid,
    immutPutItems,
    immutRemoveItemAt,
    immutRemoveItemByGuid,
    immutSetItemAt,
    immutSwapItems,
    immutTakeItems,
};

export = inventoryImmutSetters;
