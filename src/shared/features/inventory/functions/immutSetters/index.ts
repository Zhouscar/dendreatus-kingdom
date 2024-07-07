import immutClearInventoryKeepSoulbound from "./immutCleanInventoryKeepSoulbound";
import immutConsumeItem from "./immutConsumeItem";
import immutInsertItem from "./immutInsertItem";
import immutModifyItemAtGuid from "./immutModifyItemAtGuid";
import immutPutItems from "./immutPutItems";
import immutReconcileInventory from "./immutReconcileInventory";
import immutRemoveItemAt from "./immutRemoveItemAt";
import immutRemoveItemByGuid from "./immutRemoveItemByGuid";
import immutSetItemAt from "./immutSetItemAt";
import immutSwapItems from "./immutSwapItems";
import immutTakeItems from "./immutTakeItems";
import immutTakeItemsAtGuid from "./immutTakeItemsAtGuid";

const inventoryImmutSetters = {
    immutClearInventoryKeepSoulbound,
    immutConsumeItem,
    immutInsertItem,
    immutModifyItemAtGuid,
    immutPutItems,
    immutReconcileInventory,
    immutRemoveItemAt,
    immutRemoveItemByGuid,
    immutSetItemAt,
    immutSwapItems,
    immutTakeItems,
    immutTakeItemsAtGuid,
};

export = inventoryImmutSetters;
