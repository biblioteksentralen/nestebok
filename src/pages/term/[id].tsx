import { colors, Container, Heading, List, ListItem, Stack, Text } from "@biblioteksentralen/js-utils";
import { GetStaticPaths, GetStaticProps } from "next";
import SEO from "../../components/SEO";
import StarProgressBar from "../../components/StarProgressBar";
import VerkPreview from "../../components/verk/VerkPreview";
import { ReadalikesResponse, VocabularyResponse } from "../../utils/forrigebokApi";

export const getStaticPaths: GetStaticPaths = async () => {
  const vocabulary: VocabularyResponse = await fetch(`https://forrigebok.no/api/v2022-10-10/vocabulary`, {
    headers: {
      "X-User-Agent": "Nestebok",
    },
  }).then((data) => data.json());

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

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const id = ctx.params?.id;
  const vocabulary: VocabularyResponse = await fetch(`https://forrigebok.no/api/v2022-10-10/vocabulary`).then((data) =>
    data.json()
  );
  const term = vocabulary.terms.find((term) => term.id === id);

  if (!term) {
    return {
      notFound: true,
    };
  }

  const readalikesResponse: ReadalikesResponse = await fetch(
    `https://forrigebok.no/api/v2022-10-10/readalikes?terms=${term.id}&limit=10`
  ).then((data) => data.json());

  return {
    props: {
      term,
      eksempler: readalikesResponse,
      factor: vocabulary.factors.find((factor) => factor.id === term.factorId),
    },
    revalidate: 600,
  };
};

export const View = ({ term, eksempler, factor }: Props) => {
  return (
    <Container maxW="container.lg" color="whiteAlpha.800">
      <SEO title={term.name} description={`Utforsk appelltermen ${term.name}`} />
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
