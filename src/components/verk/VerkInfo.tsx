import { Container, Grid, Text } from "@chakra-ui/react";
import { WorksResponse } from "../../utils/forrigebokApi";
import Coverimage from "./CoverImage";
import Metadata from "./Metadata";
import Sammendrag from "./Sammendrag";
import { VerkTitle } from "./VerkTitle";

interface Props {
  verk: WorksResponse["works"][number];
}

function VerkInfo({ verk }: Props) {
  return (
    <Container
      maxW="5xl"
      background="gray.100"
      borderRadius={{ lg: "xl" }}
      display="flex"
      justifyContent="center"
      padding="0"
      color="gray.900"
    >
      <Container maxW="container.lg" padding={0}>
        <Grid
          padding="2.5rem 1rem"
          minH="10rem"
          justifyItems="start"
          gap={{ base: "1rem 1.5rem", sm: "2rem", md: "1.5rem 3rem" }}
          gridTemplateColumns={{ base: "7rem 1fr", sm: "minmax(8rem, 30%) 1fr" }}
          gridTemplateRows={{ base: "auto 1fr", md: "auto auto 1fr" }}
          gridTemplateAreas={{
            base: `
              "title title"
              "img meta"
              "sammendrag sammendrag"
              "description description"
            `,
            sm: `
              "img title"
              "img meta"
              "sammendrag sammendrag"
              "description description"
            `,
            md: `
              "img title"
              "img meta"
              "img sammendrag"
              "img description"
            `,
          }}
        >
          <Coverimage gridArea="img" verk={verk} boxShadow="md" />
          <header style={{ gridArea: "title" }}>
            <VerkTitle verk={verk} headingProps={{ as: "h1", size: "xl" }} fontSize="1.2rem" fontWeight={600} />
          </header>
          <Metadata verk={verk} gridArea="meta" />
          <Text overflowWrap="anywhere" style={{ gridArea: "description" }}>
            {verk.simplifiedPresentationMetadata?.description}
          </Text>
          <Sammendrag gridArea="sammendrag" verk={verk} />
        </Grid>
      </Container>
    </Container>
  );
}

export default VerkInfo;
