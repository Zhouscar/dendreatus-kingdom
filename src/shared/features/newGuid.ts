import { HttpService } from "@rbxts/services";

function newGuid() {
    return HttpService.GenerateGUID(false);
}

export = newGuid;
