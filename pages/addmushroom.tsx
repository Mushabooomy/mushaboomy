import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Flex, Box, Button, Label, Input, Textarea, Radio } from "theme-ui";

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
          <Box as="form" onSubmit={(e) => e.preventDefault}>
            <Label htmlFor="scientificname">Scientific Name</Label>
            <Input name="scientificname" id="scientificname" />
            <Label htmlFor="commonname">Common Name</Label>
            <Input name="commonname" id="commonname" />
            <Label htmlFor="pictures">Upload Pictures</Label>
            <Input name="pictures" id="pictures" type="file" />
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" id="comment" rows={4} />
            <Label>Edibility</Label>
            <Flex>
              <Label>
                <Radio name="edibility" /> Edible
              </Label>
              <Label>
                <Radio name="edibility" /> Inedible
              </Label>
              <Label>
                <Radio name="edibility" /> Poisonous
              </Label>
              <Label>
                <Radio name="edibility" /> Unknown
              </Label>
            </Flex>
            <Label htmlFor="sporeprint">Spore Print (Color)</Label>
            <Input name="sporeprint" id="sporeprint" />
            <Label htmlFor="edibilitynotes">Edibility Notes</Label>
            <Textarea name="edibilitynotes" id="comment" rows={2} />
            <Button>Submit</Button>
          </Box>
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
              await router.push("/");
            }}
          >
            Sign out
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddMushroom;
