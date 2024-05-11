import { getBindingValue, useEventListener } from "@rbxts/pretty-roact-hooks";
import { createMotion, Motion, MotionGoal, SpringOptions } from "@rbxts/ripple";
import { Binding } from "@rbxts/roact";
import { useBinding, useMemo, useMutable, useRef } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";

export function useMotion(initialValue: number): LuaTuple<[Binding<number>, Motion]>;

export function useMotion<T extends MotionGoal>(initialValue: T): LuaTuple<[Binding<T>, Motion<T>]>;

export function useMotion<T extends MotionGoal>(initialValue: T) {
    const motion = useMemo(() => {
        return createMotion(initialValue);
    }, []);

    const [binding, setValue] = useBinding(initialValue);

    useEventListener(RunService.Heartbeat, (delta) => {
        const value = motion.step(delta);

        if (value !== binding.getValue()) {
            setValue(value);
        }
    });

    return $tuple(binding, motion);
}

export function useSpring(goal: number | Binding<number>, options?: SpringOptions): Binding<number>;

export function useSpring<T extends MotionGoal>(
    goal: T | Binding<T>,
    options?: SpringOptions,
): Binding<T>;

export function useSpring(goal: MotionGoal | Binding<MotionGoal>, options?: SpringOptions) {
    const [binding, motion] = useMotion(getBindingValue(goal));
    const previousValue = useMutable(getBindingValue(goal));

    useEventListener(RunService.Heartbeat, () => {
        const currentValue = getBindingValue(goal);

        if (currentValue !== previousValue.current) {
            previousValue.current = currentValue;
            motion.spring(currentValue, options);
        }
    });

    return binding;
}
