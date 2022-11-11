const csp = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "plausible.io",
    ...(process.env.NODE_ENV === "development"
      ? [
          "'unsafe-eval'", // node_modules/@next/react-refresh-utils/runtime.js
        ]
      : []),
  ],
  "style-src": [
    "'self'",
    "'unsafe-inline'", // emotion
    "fonts.googleapis.com",
  ],
  "connect-src": [
    "'self'",
    "plausible.io/api/",
    // For Safari, se https://bugs.webkit.org/show_bug.cgi?id=201591
    ...(process.env.NODE_ENV === "development" ? ["ws://localhost:3000"] : []),
  ],
  "font-src": ["fonts.gstatic.com"],
  "img-src": [
    "'self'",
    "data:", // next-image
    "media.aja.bs.no",
    "www.cappelendamm.no/",
    "aja.bs.no",
  ],
};

const stringified = Object.entries(csp)
  .map((entry) => `${entry[0]} ${entry[1].join(" ")}`)
  .join("; ");

module.exports = stringified;
