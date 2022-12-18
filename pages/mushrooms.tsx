import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
  const session = useSession();
  const supabase = useSupabaseClient();

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
              <MushroomView {...mushroom} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mushrooms;
