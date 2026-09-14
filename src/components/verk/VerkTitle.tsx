import { Heading, HeadingProps, Stack, Text, type StackProps } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { WorksResponse } from "../../utils/forrigebokApi";

type Props = {
  verk: WorksResponse["works"][number];
  hideSubtitle?: boolean;
  headingProps?: HeadingProps;
} & StackProps;

export function VerkTitle({ verk, headingProps, hideSubtitle, ...chakraProps }: Props) {
  return (
    <Stack {...chakraProps} gap="0">
      <Heading fontWeight={700} size="md" as="h3" lineClamp={2} {...headingProps}>
        {verk.simplifiedPresentationMetadata?.title}
      </Heading>
      {!hideSubtitle && verk.simplifiedPresentationMetadata?.subtitle && (
        <Text
          lineClamp={1}
          fontWeight={600}
          fontSize="sm"
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
