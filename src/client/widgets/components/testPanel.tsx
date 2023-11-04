import Roact from "@rbxts/roact";

function TestPanel(props: { size?: UDim2; position?: UDim2; context: Map<string, () => void> }) {
    const size = props.size || new UDim2(0, 500, 0, 500);
    const position = props.position || new UDim2(0, 0, 0, 0);
    const context = props.context;

    const buttons: Roact.Element[] = [];

    context.forEach((onClick, text) => {
        buttons.push(
            <textbutton Key={text} Text={text} Event={{ MouseButton1Click: onClick }}></textbutton>,
        );
    });

    return (
        <frame Transparency={1} Size={size} Position={position}>
            <uigridlayout CellSize={new UDim2(0, 50, 0, 50)}></uigridlayout>
            {buttons}
        </frame>
    );
}

export = TestPanel;
