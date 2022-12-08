import {
  Flex,
  Box,
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
} from "theme-ui";

const AddMushroom = () => {
  return (
    <Box as="form" onSubmit={(e) => e.preventDefautlt()}>
      <Label htmlFor="scientificname">Scientific Name</Label>
      <Input name="scientificname" id="scientificname" />
      <Label htmlFor="commonname">Common Name</Label>
      <Input name="commonname" id="commonname" />
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
    </Box>
  );
};

export default AddMushroom;
