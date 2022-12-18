import { useState, useRef } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

interface Mushroom {
  scientificName: string;
  commonName: string;
  description: string;
  sporePrint: string;
  edibility: string;
  edibilityNotes: string;
  photoUrl: string;
}

const AddMushroom = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [scientificName, setScienctificName] = useState("");
  const [commonName, setCommonName] = useState("");
  const [description, setDescription] = useState("");
  const [sporePrint, setSporePrint] = useState("");
  const [edibility, setEdibility] = useState("");
  const [edibilityNotes, setEdibilityNotes] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoFile, setPhotoFile] = useState({});
  const ref = useRef();

  const addMushroom = async () => {
    try {
      setLoading(true);

      const mushroom: Mushroom = {
        scientificName,
        commonName,
        description,
        sporePrint,
        edibility,
        edibilityNotes,
        photoUrl,
        user_id: session?.user.id,
        user_email: session?.user.email,
      };
      const { error } = await supabase.from("mushroom").insert(mushroom);
      if (error) throw error;
      alert("Mushroom added!");
    } catch (error) {
      alert("Error creating record...");
      console.log(error);
    } finally {
      ref.current.value = "";
      setLoading(false);
    }
  };

  const uploadPhoto = async () => {
    setPhotoUploading(true);
    try {
      const newFileName = `${session?.user.id}-${photoFile.name}`;
      const filePath = `${newFileName}`;
      setPhotoUrl(filePath);

      const { error: uploadError } = await supabase.storage
        .from("mushroom-photos")
        .upload(filePath, photoFile, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      alert("Error uploading photo...");
      console.log(error);
    } finally {
      setPhotoUploading(false);
    }
  };

  const handlePhotoChange = async (e) => {
    setPhotoUploading(true);
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    setPhotoFile(e.target.files[0]);
  };

  return (
    <div className="container">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="default"
        />
      ) : (
        <div>
          <div className="flex-column" id="addMushroom">
            <label htmlFor="scientificName">Scientific Name</label>
            <input
              type="text"
              name="scientificName"
              id="scientificName"
              onChange={(e) => {
                setScienctificName(e.target.value);
              }}
            />
            <label htmlFor="commonName">Common Name</label>
            <input
              type="text"
              name="commonName"
              id="commonName"
              onChange={(e) => {
                setCommonName(e.target.value);
              }}
            />
            <label htmlFor="pictures">Upload Pictures</label>
            <input
              name="pictures"
              id="pictures"
              type="file"
              ref={ref}
              onChange={(e) => handlePhotoChange(e)}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="comment"
              rows={4}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <label htmlFor="sporePrint">Spore Print (Color)</label>
            <input
              type="text"
              name="sporePrint"
              id="sporePrint"
              onChange={(e) => {
                setSporePrint(e.target.value);
              }}
            />
            <label>Edibility</label>
            <fieldset
              id="edibility"
              onChange={(e) => {
                setEdibility(e.target.value);
              }}
            >
              <label>
                <input type="radio" value="Edible" name="edibility" /> Edible
              </label>
              <label>
                <input type="radio" value="Inedible" name="edibility" />{" "}
                Inedible
              </label>
              <label>
                <input type="radio" value="Poisonous" name="edibility" />{" "}
                Poisonous
              </label>
              <label>
                <input type="radio" value="Unknown" name="edibility" /> Unknown
              </label>
            </fieldset>
            <label htmlFor="edibilityNotes">Edibility Notes</label>
            <textarea
              name="edibilityNotes"
              id="edibilityNotes"
              rows={2}
              onChange={(e) => setEdibilityNotes(e.target.value)}
            />
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                await uploadPhoto();
                await addMushroom();
              }}
            >
              Submit
            </button>
          </div>

          <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default AddMushroom;
