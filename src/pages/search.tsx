import {
  Box,
  Center,
  colors,
  Container,
  Flex,
  keyframes,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  Show,
  Spinner,
  Stack,
  Text,
} from "@biblioteksentralen/js-utils";
import { css } from "@emotion/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import SearchInput from "../components/SearchInput";
import SEO from "../components/SEO";
import Coverimage from "../components/verk/CoverImage";
import Metadata from "../components/verk/Metadata";
import { VerkTitle } from "../components/verk/VerkTitle";
import { WorksResponse } from "../utils/forrigebokApi";

function Wrapper() {
  const { q } = useRouter().query;
  const query = typeof q === "string" && q.length > 0 ? q : null;

  return (
    <>
      <SEO title={query ? `"${query}"` : undefined} />
      <SearchInput />
      <Container marginTop="2rem" maxW="container.md">
        <Search />
      </Container>
    </>
  );
}

function Search() {
  const { q } = useRouter().query;
  const query = typeof q === "string" && q.length > 0 ? q : null;
  const results = useSWR<WorksResponse>(query, (query) =>
    fetch(`/api/search?q=${q}`).then((response) => response.json())
  );

  if (!query) return null;

  if (results.error) {
    console.error(results.error);
    return <Box>Det skjedde en feil</Box>;
  }

  if (!results.data)
    return (
      <Center paddingY="2rem">
        <Spinner margin="auto" size="xl" />
      </Center>
    );

  if (!results.data?.works.length) return <IngenTreff query={query} />;

  return <TreffListe data={results.data} />;
}

const IngenTreff = (props: { query: string }) => (
  <Center>
    <Text fontSize="lg" paddingY="1rem">
      Søk på{" "}
      <Box as="span" fontWeight={600}>
        «{props.query}»
      </Box>{" "}
      ga ingen treff
    </Text>
  </Center>
);

const slideDown = keyframes`
from {
    opacity: 0;
    transform: translateY(-1rem) scale(0.95);
}
`;

const TreffListe = (props: { data: WorksResponse }) => (
  <List spacing="1rem">
    {props.data?.works.map((verk, i) => (
      <ListItem
        key={verk.id}
        css={css`
          animation: ${slideDown} 0.15s backwards ${i * 0.1}s;
        `}
      >
        <LinkBox
          cursor="pointer"
          display="flex"
          borderRadius="lg"
          backgroundColor="gray.800"
          transition=".3s"
          _hover={{ backgroundColor: "gray.700" }}
        >
          <Coverimage borderRightRadius="none" width="7rem" verk={verk} boxShadow="md" />
          <Stack spacing=".25rem" padding="1rem">
            <NextLink href={`/verk/${encodeURIComponent(verk?.id)}`} passHref>
              <LinkOverlay>
                <VerkTitle
                  verk={verk}
                  headingProps={{
                    as: "h3",
                    size: "md",
                  }}
                />
              </LinkOverlay>
            </NextLink>
            <Metadata verk={verk} />
            <Show above="md">
              <Flex flexGrow={1} gap=".5rem" alignItems="flex-end" fontSize="sm" fontWeight="600" flexWrap="wrap">
                {verk.appealTerms.slice(0, 3).map((term) => (
                  <Box
                    backgroundColor={colors.neptune[600]}
                    padding=".25rem .5rem"
                    borderRadius="md"
                    key={term.term.id}
                  >
                    {term.term.label}
                  </Box>
                ))}
              </Flex>
            </Show>
          </Stack>
        </LinkBox>
      </ListItem>
    ))}
  </List>
);

export default Wrapper;
