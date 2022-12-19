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

//Handle readOne

//Handle readAll

//Handle updateOne

//Handle delete one
