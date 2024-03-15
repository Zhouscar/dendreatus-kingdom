import { receiver } from "client/store/broadcast";
import { routes } from "shared/routes";

function reflexDispatch() {
    for (const [pos, _, actions] of routes.reflexDispatch.query()) {
        receiver.dispatch(actions);
    }
}

export = reflexDispatch;
