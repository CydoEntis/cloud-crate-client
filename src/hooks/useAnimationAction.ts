import { useState } from "react";

type AnimationPhase = "idle" | "loading" | "success";

export function useAnimatedAction(successResetDelay = 1000) {
  const [phase, setPhase] = useState<AnimationPhase>("idle");

  const run = async (action: () => Promise<unknown>, delay = 300) => {
    setPhase("loading");
    try {
      await Promise.all([action(), sleep(delay)]);
      setPhase("success");
      setTimeout(() => setPhase("idle"), successResetDelay);
    } catch (error) {
      setPhase("idle");
      throw error;
    }
  };

  return {
    phase,
    run,
    isIdle: phase === "idle",
    isLoading: phase === "loading",
    isSuccess: phase === "success",
  };
}

// helper sleep function
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
