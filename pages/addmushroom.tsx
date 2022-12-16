import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const AddMushroom = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="default"
        />
      ) : (
        <form>
          <form onSubmit={(e) => e.preventDefault}>
            <label htmlFor="scientificname">Scientific Name</label>
            <input name="scientificname" id="scientificname" />
            <label htmlFor="commonname">Common Name</label>
            <input name="commonname" id="commonname" />
            <label htmlFor="pictures">Upload Pictures</label>
            <input name="pictures" id="pictures" type="file" />
            <label htmlFor="description">Description</label>
            <textarea name="description" id="comment" rows={4} />
            <label>Edibility</label>
            <div>
              <label>
                <input type="radio" name="edibility" /> Edible
              </label>
              <label>
                <input type="radio" name="edibility" /> Inedible
              </label>
              <label>
                <input type="radio" name="edibility" /> Poisonous
              </label>
              <label>
                <input type="radio" name="edibility" /> Unknown
              </label>
            </div>
            <label htmlFor="sporeprint">Spore Print (Color)</label>
            <input name="sporeprint" id="sporeprint" />
            <label htmlFor="edibilitynotes">Edibility Notes</label>
            <textarea name="edibilitynotes" id="comment" rows={2} />
            <button>Submit</button>
          </form>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              await router.push("/");
            }}
          >
            Sign out
          </button>
        </form>
      )}
    </div>
  );
};

export default AddMushroom;
