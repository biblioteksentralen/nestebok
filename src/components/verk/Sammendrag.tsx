import { colors } from "@biblioteksentralen/utils";
import { Box, List, type ListRootProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { getTermUrl } from "../../pages/term/[id]";
import { WorksResponse } from "../../utils/forrigebokApi";
import StarProgressBar from "../StarProgressBar";

function Sammendrag({ verk, ...chakraProps }: { verk: WorksResponse["works"][number] } & ListRootProps) {
  const termer = verk.appealTerms.slice(0, 7);
  return (
    <List.Root
      listStyleType="none"
      display="flex"
      flexDirection="row"
      gap=".5em"
      flexWrap="wrap"
      alignContent="flex-start"
      {...chakraProps}
    >
      {termer.map((term) => (
        <Term key={term.term.id} {...term} />
      ))}
    </List.Root>
  );
}

const Term = (props: WorksResponse["works"][number]["appealTerms"][number]) => {
  const fremtredende = (props.averageWeight ?? 0) > 0.5;
  return (
    <List.Item>
      <Box
        asChild
        display="flex"
        gap=".25em"
        width="max-content"
        color="white"
        borderRadius="md"
        backgroundColor={fremtredende ? colors.neptune[700] : colors.neptune[500]}
        padding=".2em .75em"
        fontWeight={600}
        _hover={{ opacity: 0.9 }}
      >
        <NextLink href={getTermUrl({ name: props.term.label, id: props.term.id })}>
          <StarProgressBar progress={fremtredende ? 1 : 0.5} />
          <span>{props.term.label}</span>
        </NextLink>
      </Box>
    </List.Item>
  );
};

export default Sammendrag;
