import { useContext } from "@rbxts/roact-hooked";
import { RemoteTokenContext } from "../contexts/remoteToken";

export default function useRemoteToken() {
    return useContext(RemoteTokenContext).remoteToken;
}
