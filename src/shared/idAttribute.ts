import { HOST } from "./host";

export const ID_ATTRIBUTE =
    HOST === "CLIENT" ? "clientEntityId" : HOST === "SERVER" ? "serverEntityId" : "unknownEntityId";
