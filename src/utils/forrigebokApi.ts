export interface WorksResponse {
  total: number;
  works: Work[];
}
export interface Work {
  id: string;
  simplifiedPresentationMetadata: {
    title: string;
    subtitle?: string;
    authors: string[];
    coverImage?: string;
    description?: string;
    originalYear?: string;
    genre: string[];
    about: string[];
  };
  publications: {
    id: string;
    isbn: string;
    title: string;
    subtitle?: string;
    coverImage?: string;
    datePublished: string;
    language: string;
  }[];
  numberOfRegistrations: number;
  appealTerms: {
    averageWeight: number;
    term: {
      id: string;
      label: string;
      factor: {
        label: string;
        id: string;
      };
      facet: {
        label: string;
        id: string;
      };
    };
  }[];
}

export interface VocabularyResponse {
  factors: {
    name: string;
    id: string;
  }[];
  facets: {
    name: string;
    id: string;
    factorId: string;
  }[];
  terms: {
    name: string;
    id: string;
    factorId: string;
    facetId: string | null;
    definition: string | null;
    synonyms: string[];
    scopeNote: string | null;
  }[];
}

export type ReadalikesResponse = {
  readalikes: Work[];
  work?: Work;
};
