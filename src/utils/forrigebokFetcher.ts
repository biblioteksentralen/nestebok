export const forrigebokFetcher = (path: string) =>
  fetch(`https://forrigebok.no${path}`, {
    headers: {
      "X-User-Agent": "Nestebok",
    },
  }).then((data) => data.json());
