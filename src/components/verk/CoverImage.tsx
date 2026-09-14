import { BookIcon } from "@biblioteksentralen/icons";
import { colors, seededRandom } from "@biblioteksentralen/utils";
import { Box, Image, type BoxProps } from "@chakra-ui/react";
import { WorksResponse } from "../../utils/forrigebokApi";

interface Props extends BoxProps {
  verk: WorksResponse["works"][number];
}

const coverColors = [colors.accentBlueDark, colors.accentPurple, colors.accentGreen];

const randomColor = (seed: string) => coverColors[Math.floor(seededRandom(seed) * coverColors.length)];

function Coverimage({ verk, ...chakraProps }: Props) {
  const imgUrl = verk.simplifiedPresentationMetadata.coverImage;

  if (!imgUrl) {
    return (
      <Box
        aspectRatio="0.7"
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
        <BookIcon fontSize="1em" aria-hidden />
      </Box>
    );
  }

  return <Image borderRadius="lg" src={imgUrl} alt="" {...chakraProps} />;
}

export default Coverimage;
