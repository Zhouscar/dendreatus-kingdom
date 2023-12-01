import { Host } from "type";

export function getIdAttribute(host: Host) {
    return host === "CLIENT"
        ? "clientEntityId"
        : host === "SERVER"
        ? "serverEntityId"
        : "unknownEntityId";
}
