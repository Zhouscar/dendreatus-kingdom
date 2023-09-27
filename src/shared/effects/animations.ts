export type MyAnimator = Animator | AnimationController;

type Tracks = Map<string, AnimationTrack>;
const storage: Map<MyAnimator, Tracks> = new Map();

export const forMovement = Enum.AnimationPriority.Movement;

export function preloadAnimations(animator: MyAnimator, ...animIds: string[]) {
    animIds.forEach((animId) => {
        preloadAnimation(animator, animId);
    });
}

export function preloadAnimation(animator: MyAnimator, animId: string) {
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
        const animationInstance = new Instance("Animation");
        animationInstance.AnimationId = animId;
        const [ok, tryTrack] = pcall(() => {
            return animator.IsA("Animator")
                ? animator.LoadAnimation(animationInstance)
                : animator.LoadAnimation(animationInstance);
        });
        if (!ok) {
            warn(`Error loading animation id: ${animId}`);
            return;
        }
        track = tryTrack as AnimationTrack;
        tracks.set(animId, track);
    }
}

export function getTrackLength(animator: MyAnimator, animId: string): number | undefined {
    const tracks = storage.get(animator);
    if (tracks === undefined) {
        return;
    }

    const track = tracks.get(animId);
    if (track === undefined) {
        return undefined;
    }

    return track.Length / track.Speed;
}

export function startAnimation(
    animator: MyAnimator,
    animId: string,
    priority: Enum.AnimationPriority,
    speed: number,
    looped: boolean,
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
        const animationInstance = new Instance("Animation");
        animationInstance.AnimationId = animId;
        const [ok, tryTrack] = pcall(() => {
            return animator.IsA("Animator")
                ? animator.LoadAnimation(animationInstance)
                : animator.LoadAnimation(animationInstance);
        });
        if (!ok) {
            warn(`Error loading animation id: ${animId}`);
            return;
        }
        track = tryTrack as AnimationTrack;
        tracks.set(animId, track);
    }

    track.AdjustSpeed(speed);
    track.Looped = looped;
    track.Priority = priority;
    if (animator.IsA("Animator")) {
        animator.GetPlayingAnimationTracks().forEach((track) => {
            if (track.Priority.Value > priority.Value) return;
            track.Stop();
        });
    } else {
        animator.GetPlayingAnimationTracks().forEach((track) => {
            if (track.Priority.Value > priority.Value) return;
            track.Stop();
        });
    }
    track.Play();
}

export function resumeAnimation(
    animator: MyAnimator,
    animId: string,
    priority: Enum.AnimationPriority,
    speed: number,
    looped: boolean,
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
        const animationInstance = new Instance("Animation");
        animationInstance.AnimationId = animId;
        const [ok, tryTrack] = pcall(() => {
            return animator.IsA("Animator")
                ? animator.LoadAnimation(animationInstance)
                : animator.LoadAnimation(animationInstance);
        });
        if (!ok) {
            warn(`Error loading animation id: ${animId}`);
            return;
        }
        track = tryTrack as AnimationTrack;
        tracks.set(animId, track);
    }

    track.AdjustSpeed(speed);
    track.Looped = looped;
    track.Priority = priority;
    if (!track.IsPlaying) {
        if (animator.IsA("Animator")) {
            animator.GetPlayingAnimationTracks().forEach((track) => {
                if (track.Priority.Value > priority.Value) return;
                track.Stop();
            });
        } else {
            animator.GetPlayingAnimationTracks().forEach((track) => {
                if (track.Priority.Value > priority.Value) return;
                track.Stop();
            });
        }
        track.Play();
    }
}
