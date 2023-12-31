import { MotorGoal, Spring } from "@rbxts/pretty-roact-hooks";
import { useEffect } from "@rbxts/roact-hooked";

export default function useSwitchMotorEffect(bool: boolean, setMotor: (goal: MotorGoal) => void) {
    useEffect(() => {
        setMotor(new Spring(bool ? 1 : 0));
    }, [bool]);
}
