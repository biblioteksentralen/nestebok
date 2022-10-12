import { BoxProps, Heading, HeadingProps, Stack, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { WorksResponse } from "../../utils/forrigebokApi";

type Props = {
  verk: WorksResponse["works"][number];
  hideSubtitle?: boolean;
  headingProps?: HeadingProps;
} & BoxProps;

export function VerkTitle({ verk, headingProps, hideSubtitle, ...chakraProps }: Props) {
  return (
    <Stack {...chakraProps} spacing=".1em">
      <Heading fontWeight={700} size="md" as="h3" noOfLines={2} {...headingProps}>
        {verk.simplifiedPresentationMetadata?.title}
      </Heading>
      {!hideSubtitle && verk.simplifiedPresentationMetadata?.subtitle && (
        <Text
          noOfLines={1}
          fontWeight={600}
          css={css`
            &::first-letter {
              text-transform: capitalize;
            }
          `}
        >
          {verk.simplifiedPresentationMetadata?.subtitle}
        </Text>
      )}
    </Stack>
  );
}
