import { Box, LinkBox, LinkOverlay, withErrorBoundary } from "@biblioteksentralen/js-utils";
import NextLink from "next/link";
import { WorksResponse } from "../../utils/forrigebokApi";
import Coverimage from "./CoverImage";
import { AuthorsLine } from "./Metadata";
import { VerkTitle } from "./VerkTitle";

function VerkPreview({ verk }: { verk: WorksResponse["works"][number] }) {
  return (
    <LinkBox
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      color="inherit"
      textDecoration="none"
      maxWidth="20rem"
      transition=".5s"
      _hover={{ transform: "scale(1.02)", transition: ".2s" }}
    >
      <Coverimage verk={verk} boxShadow="md" />
      <Box minH="4.3rem" padding=".15rem">
        <NextLink href={`/verk/${encodeURIComponent(verk?.id)}`} passHref>
          <LinkOverlay>
            <VerkTitle
              verk={verk}
              hideSubtitle
              headingProps={{
                fontSize: "md",
                padding: "0.25rem 0",
                as: "h3",
                size: "md",
              }}
            />
          </LinkOverlay>
        </NextLink>
        <AuthorsLine hideYearPublished marginTop="-.1rem" fontSize="sm" verk={verk} />
      </Box>
    </LinkBox>
  );
}

export default withErrorBoundary(VerkPreview, "BokPreview");
