import { colors } from "@biblioteksentralen/utils";
import { Box, Center, Container, Flex, Link, LinkBox, LinkOverlay, List, Spinner, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import SearchInput from "../components/SearchInput";
import SEO from "../components/SEO";
import Coverimage from "../components/verk/CoverImage";
import Metadata from "../components/verk/Metadata";
import { VerkTitle } from "../components/verk/VerkTitle";
import { WorksResponse } from "../utils/forrigebokApi";
import { forrigebokFetcher } from "../utils/forrigebokFetcher";
import { getVerkUrl } from "./verk/[workId]";

function Wrapper() {
  const { q } = useRouter().query;
  const query = typeof q === "string" && q.length > 0 ? q : null;

  return (
    <>
      <SEO description="Søk i samlingen til forrigebok.no" title={query ? `"${query}"` : undefined} path="/søk" />
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
  const results = useSWR<WorksResponse>(query ? `/works?query=${encodeURIComponent(query)}` : null, forrigebokFetcher);

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
  <Stack textAlign="center">
    <Text fontSize="lg" paddingY="1rem">
      Søk på{" "}
      <Box as="span" fontWeight={600}>
        «{props.query}»
      </Box>{" "}
      ga ingen treff.
    </Text>
    <Text fontSize="sm">
      Savner du en bok? Be bibliotekaren din om å legge den inn på{" "}
      <Link href="https://forrigebok.no/">Forrigebok.no</Link>
    </Text>
  </Stack>
);

const TreffListe = (props: { data: WorksResponse }) => (
  <List.Root gap="1rem" listStyleType="none">
    {props.data?.works.map((verk, i) => (
      <List.Item
        key={verk.id}
        animationName="slide-from-top, scale-in, fade-in"
        animationDuration="0.15s"
        animationDelay={`${i * 0.1}s`}
        animationFillMode="backwards"
        css={{ "--slide-from-top-distance": "1rem" }}
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
          <Stack columnGap=".25rem" padding="1rem">
            <LinkOverlay asChild>
              <NextLink href={getVerkUrl(verk)}>
                <VerkTitle
                  verk={verk}
                  headingProps={{
                    as: "h3",
                    size: "xl",
                  }}
                />
              </NextLink>
            </LinkOverlay>
            <Metadata verk={verk} />
            <Flex
              hideBelow="md"
              flexGrow={1}
              gap=".5rem"
              alignItems="flex-end"
              fontSize="sm"
              fontWeight="600"
              flexWrap="wrap"
            >
              {verk.appealTerms.slice(0, 3).map((term) => (
                <Box backgroundColor={colors.neptune[600]} padding=".25rem .5rem" borderRadius="md" key={term.term.id}>
                  {term.term.label}
                </Box>
              ))}
            </Flex>
          </Stack>
        </LinkBox>
      </List.Item>
    ))}
  </List.Root>
);

export default Wrapper;
