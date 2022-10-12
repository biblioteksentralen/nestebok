import { BookIcon, colors, seededRandom } from "@biblioteksentralen/js-utils";
import { Box, ChakraProps, Image, Skeleton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { WorksResponse } from "../../utils/forrigebokApi";

interface Props extends ChakraProps {
  verk: WorksResponse["works"][number];
}

const coverColors = [colors.accentBlueDark, colors.accentPurple, colors.accentGreen];

const randomColor = (seed: string) => coverColors[Math.floor(seededRandom(seed) * coverColors.length)];

function Coverimage({ verk, ...chakraProps }: Props) {
  const imgUrl = verk.simplifiedPresentationMetadata.coverImage;

  if (!imgUrl) {
    return (
      <Box
        css={`
          aspect-ratio: 0.7;
        `}
        borderRadius="lg"
        backgroundColor={randomColor(`${verk.simplifiedPresentationMetadata.title}`)}
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        fontSize="3rem"
        width="100%"
        {...chakraProps}
      >
        <BookIcon aria-hidden />
      </Box>
    );
  }

  return (
    <Image
      fallback={
        <Skeleton
          css={css`
            aspect-ratio: 0.7;
          `}
          speed={1.5}
          borderRadius="lg"
          {...chakraProps}
        />
      }
      borderRadius="lg"
      src={imgUrl}
      alt=""
      {...chakraProps}
    />
  );
}

export default Coverimage;
