import { Box, ChakraProps, List } from "@chakra-ui/react";
import StarProgressBar from "../StarProgressBar";
import NextLink from "next/link";
import { WorksResponse } from "../../utils/forrigebokApi";
import { colors } from "@biblioteksentralen/js-utils";

function Sammendrag({ verk, ...chakraProps }: { verk: WorksResponse["works"][number] } & ChakraProps) {
  const termer = verk.appealTerms.slice(0, 7);
  return (
    <List display="flex" gap=".5em" flexWrap="wrap" alignContent="flex-start" {...chakraProps}>
      {termer.map((term) => (
        <Term key={term.term.id} {...term} />
      ))}
    </List>
  );
}

const Term = (props: WorksResponse["works"][number]["appealTerms"][number]) => {
  const fremtredende = (props.weight ?? 0) > 0.5;
  return (
    <NextLink href={`/term/${props.term.id}`} passHref>
      <Box
        as="a"
        display="flex"
        gap=".25em"
        width="max-content"
        color="white"
        borderRadius="md"
        backgroundColor={fremtredende ? colors.neptune[700] : colors.neptune[500]}
        padding=".2em .75em"
        fontWeight={600}
        key={props.term?.id}
        _hover={{ opacity: 0.9 }}
      >
        <StarProgressBar progress={fremtredende ? 1 : 0.5} />
        <span>{props.term.label}</span>
      </Box>
    </NextLink>
  );
};

export default Sammendrag;
