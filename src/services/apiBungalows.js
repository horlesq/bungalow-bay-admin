import supabase from "./supabase";

export async function getBungalows() {
    const { data, error } = await supabase.from("bungalows").select("*");

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function createBungalow(newBungalow) {
    const { data, error } = await supabase
        .from("bungalows")
        .insert([newBungalow])
        .select();

    if (error) {
        console.error(error);
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
