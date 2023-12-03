/// <reference types="@rbxts/testez/globals" />

import { loggerMiddleware } from "@rbxts/reflex";
import { INVENTORY_SLOT_SIZE } from "shared/features/inventory/constants";
import canPutItems from "shared/features/inventory/functions/spaces/canPutItems";
import canTakeItems from "shared/features/inventory/functions/spaces/canTakeItems";
import hasOpenSlot from "shared/features/inventory/functions/spaces/hasOpenSlot";
import { Item } from "shared/features/items/types";
import { defaultPlayerData } from "shared/store/slices/players/defaults";
import { inventorySlice } from "shared/store/slices/players/inventory";
import { PlayerInventory } from "shared/store/slices/players/types";

export = (): void => {
    // inventorySlice.applyMiddleware(loggerMiddleware);

    const getInventory = (): PlayerInventory => {
        return inventorySlice.getState().__test__ as PlayerInventory;
    };

    const getItem = (inventory: PlayerInventory, index: number): Item | undefined => {
        return inventory.items[inventory.slots[index].itemGuid as string];
    };

    beforeEach(() => {
        inventorySlice.loadPlayerData("__test__", defaultPlayerData);
    });

    afterEach(() => {
        inventorySlice.closePlayerData("__test__");
    });

    it("should load player data", () => {
        const inventory = getInventory();
        expect(inventory).to.be.a("table");
        expect(inventory?.items).to.be.a("table");
        expect(inventory?.slots).to.be.a("table");
    });

    it("should add sticks to one slot", () => {
        expect(canPutItems(getInventory(), "stick", 2)).to.equal(true);

        inventorySlice.putItems("__test__", "stick", 2);
        const inventory = getInventory();

        expect(inventory.slots[0].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[1].itemGuid).to.equal(undefined);
        expect(getItem(inventory, 0)?.stack).to.equal(2);
        expect(getItem(inventory, 0)?.stack).to.never.equal(1);
        expect(getItem(inventory, 1)?.stack).to.throw();
    });

    it("should add sticks to two slots", () => {
        expect(canPutItems(getInventory(), "stick", 31)).to.equal(true);

        inventorySlice.putItems("__test__", "stick", 31);
        const inventory = getInventory();
        expect(inventory.slots[0].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[1].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[2].itemGuid).to.equal(undefined);
        expect(getItem(inventory, 0)?.stack).to.equal(30);
        expect(getItem(inventory, 1)?.stack).to.equal(1);
        expect(getItem(inventory, 2)?.stack).to.throw();
    });

    it("should continuously add sticks and be working", () => {
        expect(getItem(getInventory(), 0)?.stack).to.throw();

        inventorySlice.putItems("__test__", "stick", 1);

        expect(getItem(getInventory(), 0)?.stack).to.equal(1);

        inventorySlice.putItems("__test__", "stick", 1);

        expect(getItem(getInventory(), 0)?.stack).to.equal(2);

        inventorySlice.putItems("__test__", "stick", 1);

        expect(getItem(getInventory(), 0)?.stack).to.equal(3);

        inventorySlice.putItems("__test__", "stick", 1);

        expect(getItem(getInventory(), 0)?.stack).to.equal(4);
    });

    it("should not be able to add sticks when inventory cannot add that much", () => {
        expect(canPutItems(getInventory(), "stick", 890)).to.equal(true);

        inventorySlice.putItems("__test__", "stick", 890);
        const inventory = getInventory();
        for (let i = 0; i < INVENTORY_SLOT_SIZE; i++) {
            expect(inventory.slots[i].itemGuid).to.never.equal(undefined);
            if (i !== INVENTORY_SLOT_SIZE - 1) {
                expect(getItem(inventory, i)?.stack).to.equal(30);
            } else {
                expect(getItem(inventory, i)?.stack).to.equal(20);
            }
        }

        expect(canPutItems(getInventory(), "stick", 20)).to.equal(false);
        inventorySlice.putItems("__test__", "stick", 20);
        expect(inventory).to.be.equal(getInventory());
    });

    it("should add sticks to two slots and remove resulting still two slots", () => {
        expect(canPutItems(getInventory(), "stick", 40)).to.equal(true);

        inventorySlice.putItems("__test__", "stick", 40);
        let inventory = getInventory();
        expect(inventory.slots[0].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[1].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[2].itemGuid).to.equal(undefined);
        expect(getItem(inventory, 0)?.stack).to.equal(30);
        expect(getItem(inventory, 1)?.stack).to.equal(10);
        expect(getItem(inventory, 2)?.stack).to.throw();

        expect(canTakeItems(getInventory(), "stick", 5)).to.equal(true);

        inventorySlice.takeItems("__test__", "stick", 5);
        inventory = getInventory();
        expect(inventory.slots[0].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[1].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[2].itemGuid).to.equal(undefined);
        expect(getItem(inventory, 0)?.stack).to.equal(25);
        expect(getItem(inventory, 1)?.stack).to.equal(10);
        expect(getItem(inventory, 2)?.stack).to.throw();
    });

    it("should add sticks to two slots and remove resulting one slot", () => {
        expect(canPutItems(getInventory(), "stick", 40)).to.equal(true);

        inventorySlice.putItems("__test__", "stick", 40);
        let inventory = getInventory();
        expect(inventory.slots[0].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[1].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[2].itemGuid).to.equal(undefined);
        expect(getItem(inventory, 0)?.stack).to.equal(30);
        expect(getItem(inventory, 1)?.stack).to.equal(10);
        expect(getItem(inventory, 2)?.stack).to.throw();

        expect(canTakeItems(getInventory(), "stick", 35)).to.equal(true);

        inventorySlice.takeItems("__test__", "stick", 35);
        inventory = getInventory();
        expect(inventory.slots[0].itemGuid).to.equal(undefined);
        expect(inventory.slots[1].itemGuid).to.never.equal(undefined);
        expect(inventory.slots[2].itemGuid).to.equal(undefined);
        expect(getItem(inventory, 0)?.stack).to.throw();
        expect(getItem(inventory, 1)?.stack).to.equal(5);
        expect(getItem(inventory, 2)?.stack).to.throw();
    });

    it("should not be able to take sticks when inventory cannot take that much", () => {
        expect(canPutItems(getInventory(), "stick", 10)).to.equal(true);

        inventorySlice.putItems("__test__", "stick", 10);
        const inventory = getInventory();
        expect(getItem(inventory, 0)?.stack).to.be.equal(10);

        expect(canTakeItems(getInventory(), "stick", 20)).to.equal(false);
        inventorySlice.takeItems("__test__", "stick", 20);
        expect(inventory).to.be.equal(getInventory());
    });

    it("should be able to insert item into inventory", () => {
        const item: Item = {
            stack: 10,
            unique: false,
            itemType: "stick",
        };

        expect(hasOpenSlot(getInventory())).to.equal(true);

        inventorySlice.insertItem("__test__", item);
        expect(getItem(getInventory(), 0)?.itemType).to.be.equal("stick");
        expect(getItem(getInventory(), 0)?.stack).to.be.equal(10);
    });

    it("should not be able to insert item into inventory when the inventory is full", () => {
        expect(canPutItems(getInventory(), "stick", 890)).to.equal(true);

        inventorySlice.putItems("__test__", "stick", 890);
        const inventory = getInventory();
        for (let i = 0; i < INVENTORY_SLOT_SIZE; i++) {
            expect(inventory.slots[i].itemGuid).to.never.equal(undefined);
            if (i !== INVENTORY_SLOT_SIZE - 1) {
                expect(getItem(inventory, i)?.stack).to.equal(30);
            } else {
                expect(getItem(inventory, i)?.stack).to.equal(20);
            }
        }

        const item: Item = {
            stack: 10,
            unique: false,
            itemType: "stick",
        };

        expect(hasOpenSlot(getInventory())).to.equal(false);

        inventorySlice.insertItem("__test__", item);
        expect(getInventory()).to.be.equal(inventory);
    });

    it("should be setting the second index to stick", () => {
        const item: Item = {
            itemType: "stick",
            stack: 9,
            unique: false,
        };

        expect(getItem(getInventory(), 2)?.stack).to.throw();

        inventorySlice.setItemAt("__test__", 2, item);

        expect(getItem(getInventory(), 2)?.stack).to.be.equal(9);
    });

    it("should be setting the second index to stick and be removed", () => {
        const item: Item = {
            itemType: "stick",
            stack: 9,
            unique: false,
        };

        expect(getItem(getInventory(), 2)?.stack).to.throw();

        inventorySlice.setItemAt("__test__", 2, item);

        expect(getItem(getInventory(), 2)?.stack).to.be.equal(9);

        inventorySlice.removeItemAt("__test__", 2);

        expect(getItem(getInventory(), 2)?.stack).to.throw();
        expect(getInventory().slots[2].itemGuid).to.equal(undefined);
    });

    it("should be switching items with the different item types", () => {
        const fromItem: Item = {
            itemType: "stick",
            stack: 13,
            unique: false,
        };

        const toItem: Item = {
            itemType: "bigger_stick",
            stack: 4,
            unique: false,
        };

        inventorySlice.setItemAt("__test__", 3, fromItem);
        inventorySlice.setItemAt("__test__", 7, toItem);

        expect(getItem(getInventory(), 3)).to.equal(fromItem);
        expect(getItem(getInventory(), 7)).to.equal(toItem);

        inventorySlice.swapItems("__test__", 3, 7);

        expect(getItem(getInventory(), 7)).to.equal(fromItem);
        expect(getItem(getInventory(), 3)).to.equal(toItem);
    });

    it("should be switching an item with an empty slot", () => {
        const fromItem: Item = {
            itemType: "stick",
            stack: 13,
            unique: false,
        };

        inventorySlice.setItemAt("__test__", 3, fromItem);

        expect(getItem(getInventory(), 3)).to.equal(fromItem);
        expect(getItem(getInventory(), 7)).to.throw();

        inventorySlice.swapItems("__test__", 3, 7);

        expect(getItem(getInventory(), 7)).to.equal(fromItem);
        expect(getItem(getInventory(), 3)).to.throw();
    });

    it("should be filling the second item if item types are same and the first item is still existent", () => {
        const fromItem: Item = {
            itemType: "stick",
            stack: 13,
            unique: false,
        };

        const toItem: Item = {
            itemType: "stick",
            stack: 22,
            unique: false,
        };

        inventorySlice.setItemAt("__test__", 3, fromItem);
        inventorySlice.setItemAt("__test__", 7, toItem);

        expect(getItem(getInventory(), 3)?.stack).to.equal(13);
        expect(getItem(getInventory(), 7)?.stack).to.equal(22);

        inventorySlice.swapItems("__test__", 3, 7);

        expect(getItem(getInventory(), 3)?.stack).to.equal(5);
        expect(getItem(getInventory(), 7)?.stack).to.equal(30);
    });

    it("should be filling the second item if item types are same and the first item is merged with the second one", () => {
        const fromItem: Item = {
            itemType: "stick",
            stack: 13,
            unique: false,
        };

        const toItem: Item = {
            itemType: "stick",
            stack: 12,
            unique: false,
        };

        inventorySlice.setItemAt("__test__", 3, fromItem);
        inventorySlice.setItemAt("__test__", 7, toItem);

        expect(getItem(getInventory(), 3)?.stack).to.equal(13);
        expect(getItem(getInventory(), 7)?.stack).to.equal(12);

        inventorySlice.swapItems("__test__", 3, 7);

        expect(getItem(getInventory(), 3)?.stack).to.throw();
        expect(getItem(getInventory(), 7)?.stack).to.equal(25);
    });

    // it("will reconcile the inventory if the inventory size is bigger", () => {
    //     const newEmptySlots: PlayerInventorySlot[] = [];
    //     for (let i = 0; i < INVENTORY_SLOT_SIZE + 1; i++) {
    //         newEmptySlots.push({ itemGuid: undefined });
    //     }
    //     const playerDataWithBiggerInventory = produce(defaultPlayerData, (draft) => {
    //         draft.inventory.slots = newEmptySlots;
    //     });

    //     expect(
    //         playerDataWithBiggerInventory.inventory.slots.size() > INVENTORY_SLOT_SIZE,
    //     ).to.be.equal(true);

    //     inventorySlice.loadPlayerData("__test__", playerDataWithBiggerInventory);

    //     expect(getInventory().slots.size() === INVENTORY_SLOT_SIZE).to.be.equal(true);
    // });

    // it("will reconcile the inventory if the inventory size is smaller", () => {
    //     const newEmptySlots: PlayerInventorySlot[] = [];
    //     for (let i = 0; i < INVENTORY_SLOT_SIZE - 1; i++) {
    //         newEmptySlots.push({ itemGuid: undefined });
    //     }
    //     const playerDataWithBiggerInventory = produce(defaultPlayerData, (draft) => {
    //         draft.inventory.slots = newEmptySlots;
    //     });

    //     expect(
    //         playerDataWithBiggerInventory.inventory.slots.size() < INVENTORY_SLOT_SIZE,
    //     ).to.be.equal(true);

    //     inventorySlice.loadPlayerData("__test__", playerDataWithBiggerInventory);

    //     expect(getInventory().slots.size() === INVENTORY_SLOT_SIZE).to.be.equal(true);
    // });
};
