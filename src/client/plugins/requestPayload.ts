import { routes } from "shared/network";

function requestPayload(_: any, __: any, remoteToken: string) {
    task.spawn(() => {
        routes.ecsRequestPayload.send(remoteToken);
    });
}

export = requestPayload;
