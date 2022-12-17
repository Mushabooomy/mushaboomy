import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

interface Mushroom {
  scientificName: string;
  commonName: string;
  description: string;
  sporePrint: string;
  edibility: string;
  edibilityNotes: string;
  photoUrl: string;
}

const MushroomPage = (props: []) => {
  const mushroom = props.mushroom[0];
  const {
    scientificName,
    commonName,
    description,
    sporePrint,
    edibility,
    edibilityNotes,
    photoUrl,
  } = mushroom;

  return (
    <div>
      <label htmlFor="scientificName">Scientific Name</label>
      <span>{scientificName}</span>
      <label htmlFor="commonName">Common Name</label>
      <label htmlFor="pictures">Upload Pictures</label>
      <label htmlFor="description">Description</label>
      <label htmlFor="sporePrint">Spore Print (Color)</label>
      <label>Edibility</label>
      <label htmlFor="edibilityNotes">Edibility Notes</label>
    </div>
  );
};

export default MushroomPage;

export const getStaticPaths = async () => {
  const supabaseClient = createBrowserSupabaseClient();
  const { data: mushrooms } = await supabaseClient.from("mushroom").select("*");
  console.log(mushrooms);
  const paths = mushrooms.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const supabaseClient = createBrowserSupabaseClient();
  const { data: mushroom } = await supabaseClient
    .from("mushroom")
    .select("*")
    .eq("id", id);

  return {
    props: {
      mushroom,
    },
  };
};
