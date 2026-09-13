"use client";

import { useEffect } from "react";

type EventParameters = Record<string, string | number | boolean | string[]>;
type PixelWindow = Window & { fbq?: (action: string, eventName: string, parameters?: EventParameters) => void };

export function trackMetaEvent(eventName: string, parameters?: EventParameters) {
  if (typeof window !== "undefined") (window as PixelWindow).fbq?.("track", eventName, parameters);
}

export function MetaEvent({ eventName, parameters }: { eventName: string; parameters?: EventParameters }) {
  useEffect(() => { trackMetaEvent(eventName, parameters); }, [eventName, parameters]);
  return null;
}
