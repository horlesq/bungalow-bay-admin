import supabase, { supabaseUrl } from "./supabase";

export async function getBungalows() {
    const { data, error } = await supabase.from("bungalows").select("*");

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function createBungalow(newBungalow) {
    const imageName = `${Math.random()}-${newBungalow.image.name}`.replace(
        "/",
        ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/bungalow-images/${imageName}`;

    // Create a new bungalow in the database
    const { data, error } = await supabase
        .from("bungalows")
        .insert([{ ...newBungalow, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    // Upload the image to the storage
    const { error: storageError } = await supabase.storage
        .from("bungalow-images")
        .upload(imageName, newBungalow.image);

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
