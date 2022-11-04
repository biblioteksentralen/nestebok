import { EffectCallback, useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMount = (effect: EffectCallback) => useEffect(effect, []);
