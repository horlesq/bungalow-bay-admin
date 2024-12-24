import supabase from "./supabase";

export async function getBungalows() {
    const { data, error } = await supabase.from("bungalows").select("*");

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}
