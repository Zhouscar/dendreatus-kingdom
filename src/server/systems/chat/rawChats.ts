import { World } from "@rbxts/matter";
import { useAsync } from "@rbxts/matter-hooks";
import { Chat, TextService } from "@rbxts/services";
import { Chatting, ChattingRaw, Plr } from "shared/components";
import gameTime from "shared/hooks/gameTime";

function rawChats(w: World) {
    for (const [e, chattingRaw, plr] of w.query(ChattingRaw, Plr)) {
        const ready = useAsync(
            () => {
                const filteredMessage = TextService.FilterStringAsync(
                    chattingRaw.message,
                    plr.player.UserId,
                ).GetChatForUserAsync(plr.player.UserId);
                return filteredMessage;
            },
            [chattingRaw],
            e,
        );

        if (ready.completed && ready.result.success) {
            w.insert(e, Chatting({ message: ready.result.value, time: gameTime() }));
            w.remove(e, ChattingRaw);
        }
    }
}

export = rawChats;
