import { AnyEntity } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import useComponent from "../hooks/useComponent";
import { Chatting, Member, Renderable } from "shared/components";
import { useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import { useDebounceEffect, useEventListener, useLatest } from "@rbxts/pretty-roact-hooks";
import { Players, RunService } from "@rbxts/services";
import Sift from "@rbxts/sift";
import ChatBox from "../chatBox";
import { UP } from "shared/constants/direction";
import { Health } from "shared/components/health";
import { useSpring } from "../hooks/ripple";
import HealthBar from "../healthBar";
import { Sneaking } from "shared/components/movements";
import useLocalPlrE from "../hooks/useLocalPlrE";
import Transition from "../components/transition";
import useCoincidenceEffect from "../hooks/useCoincidenceEffect";

const CHAT_DURATION = 5;

export default function ProximityPlr(props: { enabled: boolean; e: AnyEntity }) {
    const e = props.e;
    const localPlrE = useLocalPlrE();
    const isLocalPlr = e === localPlrE;

    const enabled = props.enabled;

    const [chats, setChats] = useState<{ time: number; message: string }[]>([]);
    const latestChats = useLatest(chats);

    const renderable = useComponent(e, Renderable);
    const chatting = useComponent(e, Chatting);
    const health = useComponent(e, Health);
    const member = useComponent(e, Member);
    const sneaking = useComponent(e, Sneaking);

    const [showHealth, setShowHealth] = useState(false);

    useEffect(() => {
        if (health === undefined) return;
        setShowHealth(true);
    }, [health]);

    useDebounceEffect(
        () => {
            if (health !== undefined) {
                setShowHealth(false);
            }
        },
        [health],
        { wait: 3 },
    );

    const enabledTransparency = sneaking === undefined ? 0 : 0.5;

    const adnornee = useMemo(() => {
        if (renderable?.pv.IsA("Model") && renderable.pv.PrimaryPart !== undefined) {
            return renderable.pv.PrimaryPart;
        } else {
            return renderable?.pv;
        }
    }, [e, renderable]);

    const chatElements = new Map<string, Roact.Element>();
    chats.forEach((chat, i) => {
        chatElements.set(
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
            ZIndexBehavior={"Sibling"}
        >
            <Transition enabled={enabled} enabledTransparency={enabledTransparency}>
                {chatElements}
            </Transition>
            <Transition enabled={enabled && !isLocalPlr} enabledTransparency={enabledTransparency}>
                <textlabel
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    Size={new UDim2(0, 100, 0, 20)}
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    AnchorPoint={new Vector2(0.5, 1)}
                    BackgroundTransparency={1}
                    Text={
                        (member !== undefined ? `[${member.role}] ` : "") +
                        Players.LocalPlayer.DisplayName
                    }
                    TextStrokeColor3={Color3.fromRGB(0, 0, 0)}
                    Font={"Fantasy"}
                    TextXAlignment={"Center"}
                    TextSize={20}
                    BorderSizePixel={0}
                />
            </Transition>
            <Transition
                enabled={enabled && showHealth && !isLocalPlr}
                enabledTransparency={enabledTransparency}
            >
                <HealthBar
                    e={e}
                    showNumber={false}
                    Position={new UDim2(0.5, 0, 0.5, -15)}
                    Size={new UDim2(0, 200, 0, 10)}
                    AnchorPoint={new Vector2(0.5, 1)}
                />
            </Transition>
        </billboardgui>
    );
}
