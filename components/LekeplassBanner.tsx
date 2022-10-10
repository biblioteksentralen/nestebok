import { colors } from "@biblioteksentralen/js-utils";
import { Box } from "@chakra-ui/react";

function LekeplassBanner() {
  return (
    <Box width="100vw" height="100vh" top="0" left="0" pointerEvents="none" position="absolute" overflow="hidden">
      <Box
        position="absolute"
        backgroundColor={colors.bsRødMedium}
        color="white"
        boxShadow="md"
        padding=".2em 10em"
        opacity={0.75}
        right={{ base: "-9em", sm: "-9em" }}
        top={{ base: "2em", sm: "4em" }}
        transform="rotate(35deg)"
        textAlign="center"
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        gap=".25em"
      >
        <span>Lekeplass for</span>
        <span>formidlingsdata</span>
      </Box>
    </Box>
  );
}

export default LekeplassBanner;
