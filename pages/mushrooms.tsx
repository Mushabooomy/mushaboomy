import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Mushroom {
  id: number;
  scientificName: string;
  commonName: string;
  description: string;
  sporePrint: string;
  edibility: string;
  edibilityNotes: string;
  photoUrl: string;
}

const Mushrooms = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data, error } = await supabase.from("mushroom").select("*");
    if (data) {
      await setMushrooms(data);
    }
    console.log(error);
  };

  return (
    <div>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="default"
        />
      ) : (
        <ul>
          {mushrooms.map((mushroom) => (
            <li key={mushroom.id}>
              <Link key={mushroom.id} href={`mushrooms/${mushroom.id}`}>
                {mushroom.id}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mushrooms;
