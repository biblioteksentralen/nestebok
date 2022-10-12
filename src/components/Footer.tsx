import { BiblioteksentralenLogo, Link, Text } from "@biblioteksentralen/js-utils";
import { Box, Container, HStack } from "@chakra-ui/react";

function Footer() {
  return (
    <Box as="footer" role="contentinfo" padding="2rem 1.5rem 1.5rem 1rem" background="gray.800" color="white">
      <Container maxW="container.xl">
        <Link href="https://www.bibsent.no/" variant="plain" display="inline-block">
          <HStack>
            <BiblioteksentralenLogo fontSize="1.5rem" />
            <Text fontWeight="600">Biblioteksentralen</Text>
          </HStack>
        </Link>
      </Container>
    </Box>
  );
}

export default Footer;
