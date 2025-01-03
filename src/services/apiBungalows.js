import supabase, { supabaseUrl } from "./supabase";

export async function getBungalows() {
    const { data, error } = await supabase.from("bungalows").select("*");

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function createEditBungalow(bungalow, id) {
    // Check if the image is already uploaded to the storage
    const hasImagePath = bungalow.image?.startsWith?.(supabaseUrl);
    // Generate a random image name
    const imageName = `${Math.random()}-${bungalow.image.name}`.replace(
        "/",
        ""
    );
    // Get the image path
    const imagePath = hasImagePath
        ? bungalow.image
        : `${supabaseUrl}/storage/v1/object/public/bungalow-images/${imageName}`;

    // Create a query to the bungalows table
    let query = supabase.from("bungalows");

    // Create a new bungalow in the database
    if (!id) query = query.insert([{ ...bungalow, image: imagePath }]);

    // Update an existing bungalow in the database
    if (id)
        query = query.update({ ...bungalow, image: imagePath }).eq("id", id);

    // Execute the query
    const { data, error } = await query.select().single();

    // If there was an error creating or updating the bungalow, throw an error
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    // Upload the image to the storage
    const { error: storageError } = await supabase.storage
        .from("bungalow-images")
        .upload(imageName, bungalow.image);

    // If there was an error uploading the image, delete the bungalow from the database
    if (storageError) {
        deleteBungalow(data.id);
        console.error(storageError);
        throw new Error(error.message);
    }

    return data;
}

export async function deleteBungalow(id) {
    const { error } = await supabase.from("bungalows").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
}
