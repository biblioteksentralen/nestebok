import { useUniqueId } from "@biblioteksentralen/js-utils";
import * as React from "react";
import styled from "@emotion/styled";

interface Props extends React.SVGProps<SVGSVGElement> {
  /**
   * Number between 0 and 1, decides how much of the star is filled
   */
  progress: number;
}

const Rect = styled.rect`
  transition: x 1s;
`;

function StarProgressBar(props: Props) {
  const maskId = useUniqueId();
  return (
    <svg width="1em" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id={maskId}>
        <rect x="0" y="0" width="15" height="14" fill="black" />
        <path
          d="M3.16 13.51c-.34.18-.72-.13-.65-.52l.72-4.13L.15 5.92c-.29-.28-.14-.78.25-.83l4.28-.61L6.6.69a.45.45 0 01.8 0l1.92 3.79 4.28.6c.39.06.54.56.25.84l-3.08 2.94.72 4.13c.07.4-.31.7-.65.52L7 11.54 3.16 13.5z"
          fill="white"
        />
      </mask>
      <Rect mask={`url(#${maskId})`} width="11" height="14" fill="currentColor" x={props.progress * 11 - 9.5} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 13c-.06.38.32.69.66.51L7 11.54l3.84 1.97c.34.18.72-.13.65-.52l-.72-4.13 3.08-2.94c.29-.28.14-.78-.25-.83l-4.28-.61L7.4.69a.45.45 0 00-.81 0L4.68 4.48l-4.28.6c-.39.06-.54.56-.25.84l3.08 2.94-.72 4.13zm4.3-2.43l-3.23 1.66.61-3.46a.5.5 0 00-.14-.44L1.5 5.9l3.54-.5a.46.46 0 00.35-.25L7 1.95l1.62 3.2c.07.13.2.23.34.25l3.55.5-2.55 2.43a.5.5 0 00-.14.44l.6 3.46-3.22-1.66a.44.44 0 00-.4 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export default StarProgressBar;
