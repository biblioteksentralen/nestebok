import { Box, ChakraProps, colors, Flex, Grid, LinkBox, LinkOverlay } from "@biblioteksentralen/react";
import NextLink from "next/link";
import { getVerkUrl } from "../../pages/verk/[workId]";
import { ReadalikesResponse, WorksResponse } from "../../utils/forrigebokApi";
import Coverimage from "../verk/CoverImage";
import { AuthorsLine } from "../verk/Metadata";
import { VerkTitle } from "../verk/VerkTitle";

type Props = {
  readalike: ReadalikesResponse["readalikes"][number];
  verk: WorksResponse["works"][number];
} & ChakraProps;

function Lignendebok({ readalike, verk, ...chakraProps }: Props) {
  const viktigsteMatchendeTermer = verk.appealTerms
    ?.map((verkTerm) => {
      const readalikeTermMatch = readalike.appealTerms?.find((term) => term.term?.id === verkTerm.term?.id);
      return {
        score: (readalikeTermMatch?.averageWeight ?? 0) * (verkTerm.averageWeight ?? 0),
        term: verkTerm.term,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <LinkBox
      position="relative"
      transition=".5s"
      _hover={{ transform: "scale(1.02)", transition: ".2s" }}
      {...chakraProps}
    >
      <Box
        backgroundColor="white"
        borderRadius="xl"
        padding=".5rem"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="55%"
      />
      <Grid templateColumns="45% 55%" padding="0 1rem" position="relative" as="li">
        <Coverimage verk={readalike} boxShadow="md" alignSelf="end" />
        <Grid templateRows="45% 55%">
          <Flex padding=".2rem" gap=".2em" flexWrap="wrap" alignContent="flex-end">
            {viktigsteMatchendeTermer?.map((term) => (
              <Box
                width="max-content"
                color="white"
                borderRadius="md"
                backgroundColor={colors.neptune[500]}
                padding=".2em .75em"
                fontSize=".7rem"
                fontWeight={600}
                key={term.term?.id}
              >
                {term.term.label}
              </Box>
            ))}
          </Flex>
          <Box padding=".5rem">
            <LinkOverlay as={NextLink} href={getVerkUrl(readalike)}>
              <VerkTitle fontSize="xs" headingProps={{ size: "sm" }} verk={readalike} />
            </LinkOverlay>
            <AuthorsLine noOfLines={1} fontSize="sm" verk={readalike} hideYearPublished />
          </Box>
        </Grid>
      </Grid>
    </LinkBox>
  );
}

export default Lignendebok;
