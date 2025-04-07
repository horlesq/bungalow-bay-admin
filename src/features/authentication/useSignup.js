import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    const { mutate: signup, isLoading: isLoadingSignup } = useMutation({
        mutationKey: ["signup"],
        mutationFn: signupApi,

        onSuccess: () => {
            toast.success(
                "Account created successfully! Please verify your email."
            );
        },
    });

    return { signup, isLoadingSignup };
}
