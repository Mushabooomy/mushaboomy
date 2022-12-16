import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MushroomPage = (mushroom) => {
  // const supabase = useSupabaseClient();

  //Plan B... I don't think this is the right approach because I think we should be dynamically generating the individual mushroom pages which you do with getStaticPaths and getStaticProps.  The problem I'm running into is trying to access supabase within the methods below.
  // const [mushroom, setMushroom] = useState();
  // const router = useRouter();
  // const { id } = router.query;

  //Plan B...
  // useEffect(() => {
  //   getData();
  // });

  // const getData = async () => {
  //   const { data, error } = await supabase
  //     .from("mushroom")
  //     .select("*")
  //     .eq("id", id);
  //   if (data) {
  //     await setMushroom(data);
  //   }
  //   console.log(error);
  // };

  return <div>{mushroom.id}</div>;
};

export default MushroomPage;

export const getStaticPaths = async () => {
  const { data: mushrooms } = await supabase.from("mushroom").select("*");
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
  const { data: mushroom } = await supabase
    .from("mushroom")
    .select("*")
    .eq("id", id).single;

  return {
    props: {
      mushroom,
    },
  };
};
