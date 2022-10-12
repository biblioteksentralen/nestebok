import { Box, Container, Flex, Link } from "@biblioteksentralen/js-utils";
import { css } from "@emotion/react";
import NextLink from "next/link";

function Header() {
  return (
    <Box boxShadow="md" backgroundColor="gray.800" color="white" as="header">
      <Container maxW="container.xl" padding=".5rem">
        <NextLink href="/" passHref>
          <Link textDecoration="none" display="inline-block">
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
        </NextLink>
      </Container>
    </Box>
  );
}

export default Header;
