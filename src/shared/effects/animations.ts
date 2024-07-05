import { Make } from "@rbxts/altmake";
import { ANIM_IDS, AnimName } from "shared/features/ids/animations";

export type MyAnimator = Animator | AnimationController;

type Tracks = Map<string, AnimationTrack>;
const storage: Map<MyAnimator, Tracks> = new Map();

const AnimationPriority = {
    Action: Enum.AnimationPriority.Action,
    Action2: Enum.AnimationPriority.Action2,
    Action3: Enum.AnimationPriority.Action3,
    Action4: Enum.AnimationPriority.Action4,
    Core: Enum.AnimationPriority.Core,
    Idle: Enum.AnimationPriority.Idle,
    Movement: Enum.AnimationPriority.Movement,
};

export function getTrackLength(animator: MyAnimator, animName: AnimName): number | undefined {
    const animId = ANIM_IDS[animName];

    const tracks = storage.get(animator);
    if (tracks === undefined) {
        return;
    }

    const track = tracks.get(animId);
    if (track === undefined) {
        return undefined;
    }

    return track.Length;
}

export function startAnimationById(
    animator: MyAnimator,
    animId: string,
    priority: keyof typeof AnimationPriority,
    speed: number = 1,
    looped: boolean = false,
) {
    let tracks = storage.get(animator);
    if (tracks === undefined) {
        tracks = new Map();
        storage.set(animator, tracks);
        animator.Destroying.Connect(() => {
            storage.delete(animator);
        });
    }

    let track = tracks.get(animId);
    if (track === undefined) {
        const animationInstance = Make("Animation", {
            AnimationId: animId,
        });
        const [ok, tryTrack] = pcall(() => {
            return animator.IsA("Animator")
                ? animator.LoadAnimation(animationInstance)
                : animator.LoadAnimation(animationInstance);
        });
        if (!ok) {
            return;
        }
        track = tryTrack as AnimationTrack;
        tracks.set(animId, track);
    }

    const priorityEnum0 = Enum.AnimationPriority[priority];
    const priorityEnum = priorityEnum0 as Exclude<typeof priorityEnum0, () => any>;

    track.Looped = looped;
    track.Priority = priorityEnum;
    if (animator.IsA("Animator")) {
        animator.GetPlayingAnimationTracks().forEach((track) => {
            if (track.Priority.Value > priorityEnum.Value) return;
            track.Stop();
        });
    } else {
        animator.GetPlayingAnimationTracks().forEach((track) => {
            if (track.Priority.Value > priorityEnum.Value) return;
            track.Stop();
        });
    }
    track.Play();
    track.AdjustSpeed(speed);
}

export function resumeAnimationById(
    animator: MyAnimator,
    animId: string,
    priority: keyof typeof AnimationPriority,
    speed: number = 1,
    looped: boolean = false,
) {
    let tracks = storage.get(animator);
    if (tracks === undefined) {
        tracks = new Map();
        storage.set(animator, tracks);
        animator.Destroying.Connect(() => {
            storage.delete(animator);
        });
    }

    let track = tracks.get(animId);
    if (track === undefined) {
        const animationInstance = Make("Animation", {
            AnimationId: animId,
        });
        const [ok, tryTrack] = pcall(() => {
            return animator.IsA("Animator")
                ? animator.LoadAnimation(animationInstance)
                : animator.LoadAnimation(animationInstance);
        });
        if (!ok) {
            return;
        }
        track = tryTrack as AnimationTrack;
        tracks.set(animId, track);
    }

    const priorityEnum = AnimationPriority[priority];

    track.Looped = looped;
    track.Priority = priorityEnum;
    if (!track.IsPlaying) {
        if (animator.IsA("Animator")) {
            animator.GetPlayingAnimationTracks().forEach((track) => {
                if (track.Priority.Value > priorityEnum.Value) return;
                track.Stop();
            });
        } else {
            animator.GetPlayingAnimationTracks().forEach((track) => {
                if (track.Priority.Value > priorityEnum.Value) return;
                track.Stop();
            });
        }
        track.Play();
    }
    track.AdjustSpeed(speed);
}
export function startAnimation(
    animator: MyAnimator,
    animName: AnimName,
    priority: keyof typeof AnimationPriority,
    speed: number = 1,
    looped: boolean = false,
) {
    startAnimationById(animator, ANIM_IDS[animName], priority, speed, looped);
}

export function resumeAnimation(
    animator: MyAnimator,
    animName: AnimName,
    priority: keyof typeof AnimationPriority,
    speed: number = 1,
    looped: boolean = false,
) {
    resumeAnimationById(animator, ANIM_IDS[animName], priority, speed, looped);
}
