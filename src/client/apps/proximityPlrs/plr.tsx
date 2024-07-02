import { AnyEntity } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import useComponent from "../hooks/useComponent";
import { Chatting, Renderable } from "shared/components";
import { useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import { produce } from "@rbxts/immut";
import { useEventListener, useLatest } from "@rbxts/pretty-roact-hooks";
import { RunService } from "@rbxts/services";
import Sift from "@rbxts/sift";
import ChatBox from "../chatBox";
import { UP } from "shared/constants/direction";

const CHAT_DURATION = 5;

export default function ProximityPlr(props: { e: AnyEntity }) {
    const e = props.e;

    const [chats, setChats] = useState<{ time: number; message: string }[]>([]);
    const latestChats = useLatest(chats);

    const renderable = useComponent(e, Renderable);
    const chatting = useComponent(e, Chatting);

    const adnornee = useMemo(() => {
        if (renderable?.pv.IsA("Model") && renderable.pv.PrimaryPart !== undefined) {
            return renderable.pv.PrimaryPart;
        } else {
            return renderable?.pv;
        }
    }, [e, renderable]);

    const elements = new Map<string, Roact.Element>();
    chats.forEach((chat, i) => {
        elements.set(
            tostring(chat.time),
            <ChatBox
                Key={tostring(chat.time)}
                duration={CHAT_DURATION}
                e={e}
                index={i}
                message={chat.message}
                textSize={16}
                font={Enum.Font.Fantasy}
            />,
        );
    });

    useEffect(() => {
        if (chatting === undefined) return;
        print(chatting.message);
        const newChats = Sift.Array.copy(chats);

        newChats.unshift({ time: chatting.time, message: chatting.message });
        if (newChats.size() > 4) {
            newChats.pop();
        }
        setChats(newChats);
    }, [chatting]);

    useEventListener(RunService.Heartbeat, () => {
        const oldChat = latestChats.current;

        const newChat = Sift.Array.copy(oldChat);
        newChat.forEach((chat, i) => {
            if (os.clock() - chat.time > CHAT_DURATION + 1) {
                newChat.remove(i);
            }
        });

        if (!Sift.Array.equalsDeep(newChat, oldChat)) {
            setChats(newChat);
        }
    });

    return (
        <billboardgui
            Adornee={adnornee}
            ResetOnSpawn={false}
            AlwaysOnTop={true}
            Size={new UDim2(0, 500, 0, 500)}
            StudsOffset={UP.mul(2)}
            Key={tostring(e)}
        >
            {elements}
        </billboardgui>
    );
}
