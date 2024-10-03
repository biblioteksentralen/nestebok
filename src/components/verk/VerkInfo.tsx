import { Container, Text, withErrorBoundary } from "@biblioteksentralen/react";
import styled from "@emotion/styled";
import { WorksResponse } from "../../utils/forrigebokApi";
import Coverimage from "./CoverImage";
import Metadata from "./Metadata";
import Sammendrag from "./Sammendrag";
import { VerkTitle } from "./VerkTitle";

const Grid = styled.div`
  padding: 2.5rem 1rem;
  min-height: 10rem;
  display: grid;
  justify-items: start;
  grid-gap: 1.5rem 3rem;
  grid-template-columns: minmax(8rem, 30%) 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "img title"
    "img meta"
    "img sammendrag"
    "img description";
  @media (max-width: 700px) {
    grid-gap: 2rem;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "img title"
      "img meta"
      "sammendrag sammendrag"
      "description description";
  }
  @media (max-width: 500px) {
    grid-template-columns: 7rem 1fr;
    grid-gap: 1rem 1.5rem;
    grid-template-areas:
      "title title"
      "img meta"
      "sammendrag sammendrag"
      "description description";
  }
`;

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
        <Grid>
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

export default withErrorBoundary(VerkInfo, "VerkInfo");
