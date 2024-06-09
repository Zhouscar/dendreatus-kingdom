import { ReplicatedStorage } from "@rbxts/services";
import { Item, ItemType } from "./types";

const itemsAsToolsAssets = ReplicatedStorage.assets.itemsAsTools;

export function getItemAsTool(guid: string, item: Item) {
    const tool = itemsAsToolsAssets.FindFirstChild(item.itemType)?.Clone();
    assert(tool, `${item.itemType} not found`);
    tool.Name = guid;
    return tool;
}

export function getToolAsDisplayByItemType(itemType: ItemType) {
    const tool = itemsAsToolsAssets.FindFirstChild(itemType)?.Clone() as Tool | undefined;
    assert(tool);
    const handle = tool.FindFirstChild("Handle");
    if (handle && handle.IsA("BasePart")) {
        handle.CanTouch = false;
        handle.Anchored = true;
    }

    tool.GetDescendants()
        .filter((desc): desc is BasePart => desc.IsA("BasePart"))
        .forEach((part) => {
            part.CanCollide = false;
        });
    return tool;
}
