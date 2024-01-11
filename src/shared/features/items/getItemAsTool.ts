import { ReplicatedStorage } from "@rbxts/services";
import { Item } from "./types";

const itemsAsToolsAssets = ReplicatedStorage.assets.itemsAsTools;

export default function getItemAsTool(guid: string, item: Item) {
    const tool = itemsAsToolsAssets.FindFirstChild(item.itemType)?.Clone();
    assert(tool);
    tool.Name = guid;
    return tool;
}
