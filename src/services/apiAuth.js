import supabase, { supabaseUrl } from "./supabase";

export async function signup({ full_name, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name,
                avatar: "",
            },
        },
    });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function getUser() {
    const { data: session, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw new Error("Login error", { cause: sessionError });
    if (!session?.session) return null;

    const { data, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error(userError);
        throw new Error(userError.message);
    }

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function updateCurrentUser({ full_name, password, avatar }) {
    // Update full_name OR password
    let updateData = {};
    if (full_name) updateData = { data: { full_name } };
    if (password) updateData = { password };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    if (!avatar) return data;

    // Update avatar
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar, {
            cacheControl: "3600",
            upsert: true,
        });

    if (uploadError) {
        console.error(uploadError);
        throw new Error(uploadError.message);
    }

    const { data: updatedUser, error: updateError } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        });

    if (updateError) {
        console.error(updateError);
        throw new Error(updateError.message);
    }

    return updatedUser;
}
