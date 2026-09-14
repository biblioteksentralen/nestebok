export const forrigebokFetcher = async <T>(path: string): Promise<T> => {
  const url = `https://forrigebok.no/api/v2023-01-12${path}`;
  const response = await fetch(url, {
    headers: {
      "Client-Identifier": "Nestebok",
    },
  });

  // API-et kan svare med en HTML-feilside (f.eks. ved overbelastning), så vi feiler med status i stedet for en JSON-parsefeil
  if (!response.ok) {
    throw new Error(`Forrigebok-API svarte ${response.status} ${response.statusText} på ${url}`);
  }

  return response.json();
};
