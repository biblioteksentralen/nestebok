import { Box, LinkBox, LinkOverlay, withErrorBoundary } from "@biblioteksentralen/react";
import NextLink from "next/link";
import { getVerkUrl } from "../../pages/verk/[workId]";
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
        <LinkOverlay as={NextLink} href={getVerkUrl(verk)}>
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
        <AuthorsLine hideYearPublished marginTop="-.1rem" fontSize="sm" verk={verk} />
      </Box>
    </LinkBox>
  );
}

export default withErrorBoundary(VerkPreview, "BokPreview");
