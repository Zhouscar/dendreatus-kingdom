import { assetIds } from "shared/assetIds";

export = (id: string | number) => {
    const assetId = "http://www.roblox.com/asset/?id=" + tostring(id);
    if (tonumber(id) !== undefined) {
        assetIds.add(assetId);
    }
    return assetId;
};
