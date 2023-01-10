export const forrigebokFetcher = <T>(path: string) =>
  fetch(`https://forrigebok.no/api/v2022-10-10${path}`, {
    headers: {
      "X-User-Agent": "Nestebok",
    },
  }).then((data) => data.json() as T);
