import { VisuallyHidden } from "@biblioteksentralen/react";
import { Container, Heading, List, Stack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import SearchInput from "../components/SearchInput";
import SEO from "../components/SEO";
import VerkPreview from "../components/verk/VerkPreview";
import { WorksResponse } from "../utils/forrigebokApi";
import { forrigebokFetcher } from "../utils/forrigebokFetcher";
import { useId } from "react";

interface Data {
  aktuelleVoksenbøker: WorksResponse["works"];
  aktuelleBarnebøker: WorksResponse["works"];
}

export const fetchAktuelleBøker = async (): Promise<Data> => {
  const aktuelleVoksenbøkerPromise = forrigebokFetcher<WorksResponse>(
    `/works?limit=10&sort=dateUpdated&audienceAges=Voksne`
  );
  const aktuelleBarnebøkerPromise = forrigebokFetcher<WorksResponse>(
    `/works?limit=10&sort=dateUpdated&audienceAges=0-2 år,3-5 år,6-8 år,9-10 år,11-12 år,Ungdom`
  );

  const [aktuelleVoksenbøker, aktuelleBarnebøker] = await Promise.all([
    aktuelleVoksenbøkerPromise,
    aktuelleBarnebøkerPromise,
  ]);

  return {
    aktuelleVoksenbøker: aktuelleVoksenbøker.works,
    aktuelleBarnebøker: aktuelleBarnebøker.works,
  };
};

export const getStaticProps: GetStaticProps<Data> = async (ctx) => {
  const aktuelleBøker = await fetchAktuelleBøker();

  return {
    props: aktuelleBøker,
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
      <VisuallyHidden>
        <Heading as="h1">Nestebok</Heading>
      </VisuallyHidden>
      <SearchInput />
      <Container marginTop="4rem" maxW="container.lg" color="white">
        <Stack spacing="4rem">
          <AktuelleBøker aktuelleVerk={props.aktuelleVoksenbøker} label="Aktuelle bøker for voksne" />
          <AktuelleBøker aktuelleVerk={props.aktuelleBarnebøker} label="Aktuelle bøker for barn og ungdom" />
        </Stack>
      </Container>
    </>
  );
}

const AktuelleBøker = (props: { aktuelleVerk: WorksResponse["works"]; label: string }) => {
  const id = useId();
  return (
    <Stack spacing="1rem">
      <Heading as="h2" id={id}>
        {props.label}
      </Heading>
      <List
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}
        aria-labelledby={id}
      >
        {props.aktuelleVerk.map((verk) => (
          <VerkPreview verk={verk} key={verk.id} />
        ))}
      </List>
    </Stack>
  );
};

export default Index;
