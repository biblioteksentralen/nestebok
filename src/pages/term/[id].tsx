import { colors } from "@biblioteksentralen/utils";
import { Container, Heading, List, Stack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import SEO from "../../components/SEO";
import StarProgressBar from "../../components/StarProgressBar";
import VerkPreview from "../../components/verk/VerkPreview";
import { ReadalikesResponse, VocabularyResponse } from "../../utils/forrigebokApi";
import { forrigebokFetcher } from "../../utils/forrigebokFetcher";
import { slugifyString } from "../../utils/slugifyString";

// Prerendrer ingen termer ved build. Hver term har to API-kall, og å bygge alle samtidig overbelaster forrigebok-API-et.
// Sidene genereres i stedet ved første besøk og caches (fallback: "blocking" + revalidate).
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

type Props = {
  term: VocabularyResponse["terms"][number];
  factor?: VocabularyResponse["factors"][number];
  eksempler: ReadalikesResponse;
};

export const getTermUrl = (term: Pick<VocabularyResponse["terms"][number], "name" | "id">) =>
  `/term/${slugifyString(term.name)};${encodeURIComponent(term?.id)}`;

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const id =
    typeof ctx.params?.id == "string"
      ? // Split på ";" fordi første del av url før ";" kun brukes for human-readable tittel
        ctx.params.id.split(";").at(-1)
      : undefined;

  if (!id) return { notFound: true };

  const vocabularyPromise = forrigebokFetcher<VocabularyResponse>(`/vocabulary`);
  const readalikesPromise = forrigebokFetcher<ReadalikesResponse>(
    `/readalikes?terms=${encodeURIComponent(id)}&limit=10`,
  );

  const [vocabularyResponse, readalikesResponse] = await Promise.all([vocabularyPromise, readalikesPromise]);

  const term = vocabularyResponse.terms.find((term) => term.id === id);

  if (!term) return { notFound: true };

  return {
    props: {
      term,
      eksempler: readalikesResponse,
      factor: vocabularyResponse.factors.find((factor) => factor.id === term.factorId),
    },
    revalidate: 600,
  };
};

export const View = ({ term, eksempler, factor }: Props) => {
  return (
    <Container maxW="container.lg" color="whiteAlpha.800">
      <SEO title={term.name} description={`Utforsk appelltermen ${term.name}`} path={getTermUrl(term)} />
      <Stack marginLeft="-.3em">
        <Heading
          as="h1"
          display="flex"
          gap=".25em"
          width="max-content"
          color="white"
          borderRadius="xl"
          backgroundColor={colors.neptune[700]}
          padding=".3em .5em"
          fontSize={{ base: "1.1rem", sm: "1.4rem", md: "1.8rem", lg: "2.3rem" }}
          fontWeight={600}
        >
          <StarProgressBar progress={1} />
          <span>{term.name}</span>
        </Heading>
        {term.synonyms && (
          <List.Root
            listStyleType="none"
            gap=".4rem"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            alignItems="flex-start"
            alignContent="flex-end"
          >
            {term.synonyms.map((synonym) => (
              <List.Item
                fontSize="sm"
                key={synonym}
                padding=".1em .5em"
                backgroundColor={colors.neptune[500]}
                color="white"
                borderRadius="md"
              >
                {synonym}
              </List.Item>
            ))}
          </List.Root>
        )}
      </Stack>
      <Text fontWeight={600}>{factor?.name}</Text>
      <Text marginTop="2rem" maxW="20em">
        {term.definition}
      </Text>
      <List.Root
        listStyleType="none"
        marginTop="4rem"
        display="grid"
        alignItems="end"
        gridGap="calc(1rem + 1vmin)"
        gridTemplateColumns="repeat(auto-fill, minmax(8rem,1fr))"
      >
        {eksempler.readalikes.map((verk) => (
          <List.Item key={verk.id}>
            <VerkPreview verk={verk} />
          </List.Item>
        ))}
      </List.Root>
    </Container>
  );
};

export default View;
