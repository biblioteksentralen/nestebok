import { Container, ContainerProps, Heading, List, withErrorBoundary } from "@biblioteksentralen/react";
import { css, keyframes } from "@emotion/react";
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
      <List
        display="grid"
        justifyItems="center"
        gridTemplateColumns="repeat(auto-fit, minmax(16rem, 1fr))"
        gap="1rem"
        alignItems="end"
      >
        {readalikes.map((readalike, i) => (
          <Lignendebok
            key={i}
            readalike={readalike}
            verk={work}
            maxW="20rem"
            css={css`
              animation: ${popIn} 0.2s backwards ${i * 0.1 + 0.5}s;
            `}
          />
        ))}
      </List>
    </Style>
  );
}

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-.5rem) scale(0.7);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem) scale(0.9);
  }
`;

const Style = (props: ContainerProps) => (
  <Container
    color="gray.900"
    animation={`${slideDown} 1s`}
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

export default withErrorBoundary(LignendeBøker, "LignendeBøker");
