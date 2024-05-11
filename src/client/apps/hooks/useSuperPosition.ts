import Roact from "@rbxts/roact";

export default function useSuperPosition(enability: Roact.Binding<number>, position?: UDim2) {
    return enability.map((v) =>
        v > 0 ? position || new UDim2(0, 0, 0, 0) : new UDim2(5, 0, 5, 0),
    );
}
