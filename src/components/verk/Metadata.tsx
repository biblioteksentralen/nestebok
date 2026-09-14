import { Flex, FlexProps, Link, Stack, type StackProps } from "@chakra-ui/react";
import { useState } from "react";
import { WorksResponse } from "../../utils/forrigebokApi";

const LinjeMedDotter = (props: FlexProps) => (
  <Flex
    flexWrap="wrap"
    lineHeight="1.3"
    css={{
      "& > *:not(:last-child)::after": {
        display: "inline-block",
        content: '"•"',
        padding: "0 0.5em",
      },
    }}
    {...props}
  />
);

interface Props extends StackProps {
  verk: WorksResponse["works"][number];
}

function Metadata({ verk, ...chakraProps }: Props) {
  return (
    <Stack {...chakraProps}>
      <AuthorsLine verk={verk} />
      <Tags verk={verk} />
    </Stack>
  );
}

const defaultTagLimit = 4;

export function AuthorsLine({
  verk,
  hideYearPublished,
  ...chakraProps
}: Pick<Props, "verk"> & { hideYearPublished?: boolean } & FlexProps) {
  const authors = verk.simplifiedPresentationMetadata?.authors;
  const originalYear = verk.simplifiedPresentationMetadata?.originalYear;

  return (
    <LinjeMedDotter {...chakraProps}>
      {authors?.map((author) => (
        <span key={author}>{author}</span>
      ))}
      {!hideYearPublished && originalYear && <span>{originalYear}</span>}
    </LinjeMedDotter>
  );
}

function Tags({ verk }: Props) {
  const tags = [
    ...(verk.simplifiedPresentationMetadata?.genre ?? []),
    ...(verk.simplifiedPresentationMetadata?.about ?? []),
  ];
  const [visAlle, setVisAlle] = useState(tags.length <= defaultTagLimit);

  const tagsToDisplay = visAlle ? tags : tags.slice(0, defaultTagLimit - 1);

  return (
    <LinjeMedDotter fontSize="sm" fontWeight={600}>
      {tagsToDisplay.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
      {!visAlle && (
        <Link as="button" onClick={() => setVisAlle(true)}>
          Vis mer
        </Link>
      )}
    </LinjeMedDotter>
  );
}

export default Metadata;
