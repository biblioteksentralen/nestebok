import { Grid } from "@biblioteksentralen/react";
import { GetStaticPaths, GetStaticProps } from "next";
import LignendeBøker from "../../components/lignendeBøker/LignendeBøker";
import SEO from "../../components/SEO";
import VerkInfo from "../../components/verk/VerkInfo";
import { forrigebokFetcher } from "../../utils/forrigebokFetcher";
import { ReadalikesResponse, Work } from "../../utils/forrigebokApi";
import { slugifyString } from "../../utils/slugifyString";
import { fetchAktuelleBøker } from "..";

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAktuelleBøker();

  const allWorks = [...data.aktuelleBarnebøker, ...data.aktuelleVoksenbøker];

  return {
    paths: allWorks.map((work) => ({ params: { workId: encodeURIComponent(work.id) } })),
    fallback: "blocking",
  };
};

type Props = {
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

  const readalikesResponse = await forrigebokFetcher<ReadalikesResponse>(
    `/readalikes?workId=${encodeURIComponent(workId)}&limit=9`
  );

  if (!readalikesResponse.work)
    return {
      notFound: true,
    };

  return {
    props: {
      readalikesResponse,
    },
    revalidate: 120,
  };
};

export const View = (props: Props) => {
  const { readalikes, work } = props.readalikesResponse;

  if (!work) throw new Error("Mangler verk");

  return (
    <Grid gridGap="4rem" key={work.id}>
      <SEO
        title={work.simplifiedPresentationMetadata.title}
        description={`Utforsk bøker som ligner på ${work.simplifiedPresentationMetadata.title}`}
        path={getVerkUrl(work)}
      />
      <VerkInfo verk={work} />
      <LignendeBøker readalikes={readalikes} work={work} />
    </Grid>
  );
};

export default View;
