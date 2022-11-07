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
        padding=".2em 5em"
        opacity={0.75}
        right={{ base: "-5em", lg: "-4em" }}
        top={{ base: "1.5em", lg: "2em" }}
        transform="rotate(35deg)"
        textAlign="center"
        display="flex"
        flexDirection="column"
      >
        <span>Lekeplass</span>
        <span>for formidlingsdata</span>
      </Box>
    </Box>
  );
}

export default LekeplassBanner;
