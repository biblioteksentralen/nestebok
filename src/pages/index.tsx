import { Container, Heading, List, Stack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import SearchInput from "../components/SearchInput";
import VerkPreview from "../components/verk/VerkPreview";
import { forrigebokFetcher } from "../utils/forrigebokFetcher";
import { WorksResponse } from "../utils/forrigebokApi";
import SEO from "../components/SEO";

interface Data {
  aktuelleVerk: WorksResponse["works"];
}

export const getStaticProps: GetStaticProps<Data> = async (ctx) => {
  const data: WorksResponse = await forrigebokFetcher(`/api/v2022-10-10/works?sort=dateUpdated`);

  return {
    props: { aktuelleVerk: data.works },
    revalidate: 60,
  };
};

function Index(props: Data) {
  return (
    <>
      <SEO
        description="Nestebok er Biblioteksentralens åpne lesersørvistjeneste for å utforske readalikes fra forrigebok.no"
        path="/"
      />
      <SearchInput />
      <Container marginTop="2rem" maxW="container.lg" color="white">
        <Stack spacing="1rem">
          <Heading as="h1">Aktuelle bøker</Heading>
          <List display="grid" gridGap="calc(1rem + 1vmin)" gridTemplateColumns="repeat(auto-fill, minmax(8rem,1fr))">
            {props.aktuelleVerk.map((verk) => (
              <VerkPreview verk={verk} key={verk.id} />
            ))}
          </List>
        </Stack>
      </Container>
    </>
  );
}

export default Index;
