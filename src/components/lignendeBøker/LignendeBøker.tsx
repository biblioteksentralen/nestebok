import { Container, ContainerProps, Heading, List } from "@chakra-ui/react";
import { Work } from "../../utils/forrigebokApi";
import Lignendebok from "./LignendeBok";
import { useId } from "react";

function LignendeBøker(props: { readalikes: Work[]; work: Work }) {
  const headerId = useId();

  const { readalikes, work } = props;

  return (
    <Style aria-labelledby={headerId}>
      <div>
        <Heading as="h2" size="lg" id={headerId}>
          Lignende bøker:
        </Heading>
      </div>
      <List.Root
        display="grid"
        justifyItems="center"
        gridTemplateColumns="repeat(auto-fit, minmax(16rem, 1fr))"
        gap="1rem"
        alignItems="end"
      >
        {readalikes.map((readalike, i) => (
          <List.Item key={i}>
            <Lignendebok
              readalike={readalike}
              verk={work}
              maxW="20rem"
              animationName="slide-from-left, scale-in, fade-in"
              animationDuration="0.2s"
              animationDelay={`${i * 0.1 + 0.5}s`}
              animationFillMode="backwards"
            />
          </List.Item>
        ))}
      </List.Root>
    </Style>
  );
}

const Style = (props: ContainerProps) => (
  <Container
    color="gray.900"
    animationName="slide-from-top, scale-in, fade-in"
    animationDuration="1s"
    css={{ "--slide-from-top-distance": "2rem" }}
    maxW="5xl"
    backgroundColor="gray.100"
    borderRadius={{ lg: "xl" }}
    padding="0"
  >
    <Container
      as="article"
      maxW="container.lg"
      paddingY="2rem"
      display="flex"
      flexDirection="column"
      gridGap="1rem"
      {...props}
    />
  </Container>
);

export default LignendeBøker;
