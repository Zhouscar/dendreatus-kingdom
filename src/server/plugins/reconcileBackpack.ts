import { World } from "@rbxts/matter";
import { Players, ReplicatedStorage, RunService } from "@rbxts/services";
import Sift from "@rbxts/sift";
import { store } from "server/store";
import getItemAsTool from "shared/features/items/getItemAsTool";
import { defaultPlayerInventory, selectPlayerInventory } from "shared/store/players/inventory";
import { PlayerInventory } from "shared/store/players/types";

function getItemsAsTools(inventory: PlayerInventory, guids: string[]) {
    const itemsAsTools: Instance[] = [];
    guids.forEach((guid) => {
        const item = inventory.items.get(guid);
        if (!item) return;
        itemsAsTools.push(getItemAsTool(guid, item));
    });
    return itemsAsTools;
}

function getItemGuidsToAdd(inventory: PlayerInventory, prevInventory: PlayerInventory) {
    const guids: string[] = [];
    inventory.items.forEach((item, guid) => {
        if (!prevInventory.items.has(guid)) guids.push(guid);
    });
    return guids;
}

function getItemGuidsToRemove(inventory: PlayerInventory, prevInventory: PlayerInventory) {
    const guids: string[] = [];
    prevInventory.items.forEach((item, guid) => {
        if (!inventory.items.has(guid)) guids.push(guid);
    });
    return guids;
}

function getItemGuidsToReplace(inventory: PlayerInventory, prevInventory: PlayerInventory) {
    const guids: string[] = [];
    inventory.items.forEach((item, guid) => {
        const prevItem = prevInventory.items.get(guid);
        if (!prevItem) return;
        if (Sift.Dictionary.equalsDeep(item, prevItem)) return;
        guids.push(guid);
    });
    return guids;
}

function forEachPlayer(player: Player) {
    const plr = tostring(player.UserId);

    // payload when character loads
    player.CharacterAdded.Connect(() => {
        player.Backpack.ClearAllChildren();
        store.wait(selectPlayerInventory(plr)).then((inventory) => {
            print(inventory);
            assert(inventory);
            const guids = getItemGuidsToAdd(inventory, defaultPlayerInventory);
            const tools = getItemsAsTools(inventory, guids);

            tools.forEach((tool) => {
                print(tool.ClassName);
                tool.Parent = player.Backpack;
                print(player.Backpack.Parent);
            });

            return 0;
        });
    });

    // when inventory in store changes
    // make sure it considers about the equipped item in the hand
    store.subscribe(selectPlayerInventory(plr), (inventory, prevInventory) => {
        if (!inventory || !prevInventory) return;

        const toolEquipped = player.Character?.FindFirstChildOfClass("Tool");

        const guidsToAdd = getItemGuidsToAdd(inventory, prevInventory);
        const toolsToAdd = getItemsAsTools(inventory, guidsToAdd);
        toolsToAdd.forEach((tool) => {
            tool.Parent = player.Backpack;
        });

        const guidsToRemove = getItemGuidsToRemove(inventory, prevInventory);
        guidsToRemove.forEach((guid) => {
            if (guid === toolEquipped?.Name) {
                toolEquipped.Destroy();
                return;
            }
            player.Backpack.FindFirstChild(guid)?.Destroy();
        });

        const guidsToReplace = getItemGuidsToReplace(inventory, prevInventory);
        const toolsToReplace = getItemsAsTools(inventory, guidsToReplace);
        toolsToReplace.forEach((tool) => {
            const guid = tool.Name;

            if (guid === toolEquipped?.Name) {
                toolEquipped.Destroy();
            }

            player.Backpack.FindFirstChild(guid)?.Destroy();
            tool.Parent = player.Backpack;
        });
    });
}

function reconcileBackpack(w: World) {
    Players.GetPlayers().forEach(forEachPlayer);
    Players.PlayerAdded.Connect(forEachPlayer);
}

export = reconcileBackpack;
