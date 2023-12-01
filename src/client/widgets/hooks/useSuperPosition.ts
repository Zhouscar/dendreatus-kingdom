import Roact from "@rbxts/roact";

function useSuperPosition(enabilityMotor: Roact.Binding<number>, position?: UDim2) {
    return enabilityMotor.map((v) =>
        v > 0 ? position || new UDim2(0, 0, 0, 0) : new UDim2(5, 0, 5, 0),
    );
}

export = useSuperPosition;
