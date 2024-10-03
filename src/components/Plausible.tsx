import { isDevelopment } from "@biblioteksentralen/utils";
import Script from "next/script";
import React from "react";

export function PlausibleSetup() {
  if (isDevelopment()) return null;
  return <Script defer data-domain={`nestebok.no`} src="https://plausible.io/js/plausible.js" />;
}
