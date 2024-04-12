import { useEffect } from "@rbxts/plasma/src/Runtime";
import { Spring, useMotor } from "@rbxts/pretty-roact-hooks";

export default function useSpring(state: number | undefined) {
    const [motor, setMotor] = useMotor(state ?? 0);

    useEffect(() => {
        setMotor(new Spring(state ?? 0));
    }, [state]);

    return motor;
}
