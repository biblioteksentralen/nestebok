import { Container, Heading } from "@chakra-ui/react";

function NotFound() {
  return (
    <Container maxW="container.md" color="white">
      <Heading size={{ base: "3xl", md: "4xl" }}>Fant ikke siden</Heading>
    </Container>
  );
}

export default NotFound;
