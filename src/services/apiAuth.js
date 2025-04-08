import supabase from "./supabase";

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
