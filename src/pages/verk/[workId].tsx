import { Grid } from "@biblioteksentralen/js-utils";
import { GetStaticPaths, GetStaticProps } from "next";
import LignendeBøker from "../../components/lignendeBøker/LignendeBøker";
import VerkInfo from "../../components/verk/VerkInfo";
import { ReadalikesResponse, WorksResponse } from "../../utils/forrigebokApi";

export const getStaticPaths: GetStaticPaths = async () => {
  const data: WorksResponse = await fetch(`https://forrigebok.no/api/v2022-10-10/works?sort=dateUpdated`, {
    headers: {
      "X-User-Agent": "Nestebok",
    },
  }).then((data) => data.json());

  return {
    paths: data.works.map((work) => ({ params: { workId: encodeURIComponent(work.id) } })),
    fallback: "blocking",
  };
};

type Props = {
  verk: WorksResponse["works"][number];
  readalikesResponse: ReadalikesResponse;
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const workId = typeof ctx.params?.workId == "string" ? ctx.params.workId : undefined;

  if (!workId)
    return {
      notFound: true,
    };

  const data: WorksResponse = await fetch(
    `https://forrigebok.no/api/v2022-10-10/works?query=${decodeURIComponent(workId)}`,
    {
      headers: {
        "X-User-Agent": "Nestebok",
      },
    }
  ).then((data) => data.json());
  const verk = data.works[0];

  if (!verk)
    return {
      notFound: true,
    };

  const readalikesResponse: ReadalikesResponse = await fetch(
    `https://forrigebok.no/api/v2022-10-10/readalikes?workId=${workId}&limit=9`,
    {
      headers: {
        "X-User-Agent": "Nestebok",
      },
    }
  ).then((data) => data.json());

  return {
    props: {
      verk,
      readalikesResponse,
    },
    revalidate: 120,
  };
};

export const View = (props: Props) => {
  return (
    <Grid gridGap="4rem" key={props.verk.id}>
      <VerkInfo verk={props.verk} />
      <LignendeBøker readalikesResponse={props.readalikesResponse} verk={props.verk} />
    </Grid>
  );
};

export default View;
