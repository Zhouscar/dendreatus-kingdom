import { routes } from "shared/routes";

function requestPayload() {
    routes.ecsRequestPayload.send();
}

export = requestPayload;
