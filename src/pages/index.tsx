import { Container, Heading, List, Stack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import VerkPreview from "../components/verk/VerkPreview";
import { WorksResponse } from "../utils/forrigebokApi";

interface Data {
  aktuelleVerk: WorksResponse["works"];
}

export const getStaticProps: GetStaticProps<Data> = async (ctx) => {
  const data: WorksResponse = await fetch(`https://forrigebok.no/api/v2022-10-10/works?sort=dateUpdated`, {
    headers: {
      "X-User-Agent": "Nestebok",
    },
  }).then((data) => data.json());

  return {
    props: { aktuelleVerk: data.works },
    revalidate: 60,
  };
};

function Index(props: Data) {
  return (
    <Container maxW="container.lg" color="white">
      <Stack spacing="2rem">
        <Heading as="h1">Aktuelle bøker</Heading>
        <List display="grid" gridGap="calc(1rem + 1vmin)" gridTemplateColumns="repeat(auto-fill, minmax(8rem,1fr))">
          {props.aktuelleVerk.map((verk) => (
            <VerkPreview verk={verk} key={verk.id} />
          ))}
        </List>
      </Stack>
    </Container>
  );
}

export default Index;
