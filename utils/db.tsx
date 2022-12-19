export async function handleCreate(supabase: object, mushroom: object) {
  try {
    const { error } = await supabase.from('mushroom').insert(mushroom).single();
    if (error) {
      throw error;
    } else {
      alert('Mushroom record created!');
    }
  } catch (error) {
    alert('Error creating record...');
    console.log(error);
  }
}

export async function handleGetAll(supabase: object, setMushrooms) {
  try {
    const { data, error } = await supabase.from('mushroom').select('*');
    if (error) {
      throw error;
    } else {
      setMushrooms(data);
    }
  } catch (error) {
    alert('Error loading mushrooms;');
    console.log(error);
  }
}

//Handle readOne

//Handle updateOne

//Handle delete one
