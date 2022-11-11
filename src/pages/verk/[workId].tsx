import { Grid } from "@biblioteksentralen/js-utils";
import { GetStaticPaths, GetStaticProps } from "next";
import LignendeBøker from "../../components/lignendeBøker/LignendeBøker";
import SEO from "../../components/SEO";
import VerkInfo from "../../components/verk/VerkInfo";
import { forrigebokFetcher } from "../../utils/forrigebokFetcher";
import { ReadalikesResponse, Work, WorksResponse } from "../../utils/forrigebokApi";
import { slugifyString } from "../../utils/slugifyString";

export const getStaticPaths: GetStaticPaths = async () => {
  const data: WorksResponse = await forrigebokFetcher(`/api/v2022-10-10/works?sort=dateUpdated`);

  return {
    paths: data.works.map((work) => ({ params: { workId: encodeURIComponent(work.id) } })),
    fallback: "blocking",
  };
};

type Props = {
  verk: WorksResponse["works"][number];
  readalikesResponse: ReadalikesResponse;
};

export const getVerkUrl = (verk: Work) =>
  `/verk/${slugifyString(verk.simplifiedPresentationMetadata.title)};${encodeURIComponent(verk?.id)}`;

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const workId =
    typeof ctx.params?.workId == "string"
      ? // Split på ";" fordi første del av url før ";" kun brukes for human-readable tittel
        ctx.params.workId.split(";").at(-1)
      : undefined;

  if (!workId)
    return {
      notFound: true,
    };

  const data: WorksResponse = await forrigebokFetcher(`/api/v2022-10-10/works?query=${encodeURIComponent(workId)}`);
  const verk = data.works[0];

  if (!verk)
    return {
      notFound: true,
    };

  const readalikesResponse: ReadalikesResponse = await forrigebokFetcher(
    `/api/v2022-10-10/readalikes?workId=${encodeURIComponent(workId)}&limit=9`
  );

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
      <SEO
        title={props.verk.simplifiedPresentationMetadata.title}
        description={`Utforsk bøker som ligner på ${props.verk.simplifiedPresentationMetadata.title}`}
      />
      <VerkInfo verk={props.verk} />
      <LignendeBøker readalikesResponse={props.readalikesResponse} verk={props.verk} />
    </Grid>
  );
};

export default View;
