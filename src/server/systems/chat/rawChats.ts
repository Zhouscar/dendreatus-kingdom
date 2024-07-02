import { World } from "@rbxts/matter";
import { useAsync } from "@rbxts/matter-hooks";
import { Chat, TextService } from "@rbxts/services";
import { Chatting, ChattingRaw, Plr } from "shared/components";

function rawChats(w: World) {
    for (const [e, chattingRaw, plr] of w.query(ChattingRaw, Plr)) {
        const ready = useAsync(
            () => {
                const filteredMessage = TextService.FilterStringAsync(
                    chattingRaw.message,
                    plr.player.UserId,
                ).GetChatForUserAsync(plr.player.UserId);
                print(filteredMessage);
                return filteredMessage;
            },
            [chattingRaw],
            e,
        );

        if (ready.completed && ready.result.success) {
            print("he");
            w.insert(e, Chatting({ message: ready.result.value, time: os.clock() }));
            w.remove(e, ChattingRaw);
        }
    }
}

export = rawChats;
