import { BiblioteksentralenLogoWithName, Flex, Link, Stack, Text } from "@biblioteksentralen/js-utils";
import { Box, Container } from "@chakra-ui/react";

function Footer() {
  return (
    <Box as="footer" padding="4rem 0" fontSize="xs" backgroundColor="gray.800" color="white">
      <Container maxW="container.lg">
        <Flex alignItems="flex-end" flexWrap="wrap" gap="3rem">
          <Stack>
            <Text>
              <b>Nestebok</b> er utviklet av <Link href="https://www.bibsent.no">Biblioteksentralen</Link>
            </Text>
            <Text>
              Savner du en bok? Be bibliotekaren din om å legge den inn på{" "}
              <Link href="https://forrigebok.no/">Forrigebok.no</Link>
            </Text>
          </Stack>
          <Link
            href="https://www.bibsent.no"
            _hover={{ color: "gray.300" }}
            flex="1"
            display="flex"
            justifyContent="flex-end"
          >
            <BiblioteksentralenLogoWithName aria-label="Biblioteksentralen" height="3em" />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
