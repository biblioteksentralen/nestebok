import { colors, Container, Heading, List, ListItem, Stack, Text } from "@biblioteksentralen/react";
import { GetStaticPaths, GetStaticProps } from "next";
import SEO from "../../components/SEO";
import StarProgressBar from "../../components/StarProgressBar";
import VerkPreview from "../../components/verk/VerkPreview";
import { ReadalikesResponse, VocabularyResponse } from "../../utils/forrigebokApi";
import { forrigebokFetcher } from "../../utils/forrigebokFetcher";
import { slugifyString } from "../../utils/slugifyString";

export const getStaticPaths: GetStaticPaths = async () => {
  const vocabulary = await forrigebokFetcher<VocabularyResponse>(`/vocabulary`);

  return {
    paths: vocabulary.terms.map((term) => ({ params: { id: term.id } })),
    fallback: "blocking",
  };
};

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
    `/readalikes?terms=${encodeURIComponent(id)}&limit=10`
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
          <List gap=".4rem" display="flex" flexWrap="wrap" alignItems="flex-start" alignContent="flex-end">
            {term.synonyms.map((synonym) => (
              <ListItem
                fontSize="sm"
                key={synonym}
                padding=".1em .5em"
                backgroundColor={colors.neptune[500]}
                color="white"
                borderRadius="md"
              >
                {synonym}
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
      <Text fontWeight={600}>{factor?.name}</Text>
      <Text marginTop="2rem" maxW="20em">
        {term.definition}
      </Text>
      <List
        marginTop="4rem"
        display="grid"
        alignItems="end"
        gridGap="calc(1rem + 1vmin)"
        gridTemplateColumns="repeat(auto-fill, minmax(8rem,1fr))"
      >
        {eksempler.readalikes.map((verk) => (
          <ListItem key={verk.id}>
            <VerkPreview verk={verk} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default View;
