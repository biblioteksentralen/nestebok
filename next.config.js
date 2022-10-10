const csp = require("./csp");

const config = {
  i18n: {
    locales: ["no"],
    defaultLocale: "no",
  },
  async headers() {
    return [
      {
        source: "/:path((?!cms).*)*", // csp på alle sider (inkludert root), men ikke på sanity-studio
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

module.exports = config;
