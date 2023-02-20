export const forrigebokFetcher = <T>(path: string) =>
  fetch(`https://forrigebok.no/api/v2023-01-12${path}`, {
    headers: {
      "Client-Identifier": "Nestebok",
    },
  }).then((data) => data.json() as T);
