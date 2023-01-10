import { Box, Container, Flex, Link } from "@biblioteksentralen/js-utils";
import { css } from "@emotion/react";
import NextLink from "next/link";

function Header() {
  return (
    <Box boxShadow="md" backgroundColor="gray.800" color="white" as="header">
      <Container maxW="container.xl" padding=".5rem">
        <Link as={NextLink} href="/" textDecoration="none" display="inline-block">
          <Flex
            as="h2"
            css={css`
              font-variant: small-caps;
            `}
            letterSpacing={1}
            fontSize="xl"
          >
            <Box>Neste</Box>
            <Box>Bok</Box>
          </Flex>
        </Link>
      </Container>
    </Box>
  );
}

export default Header;
