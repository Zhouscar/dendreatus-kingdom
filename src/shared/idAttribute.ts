import { Host } from "types";

export function getIdAttribute(host: Host) {
    return host === "CLIENT"
        ? "clientEntityId"
        : host === "SERVER"
        ? "serverEntityId"
        : "unknownEntityId";
}
