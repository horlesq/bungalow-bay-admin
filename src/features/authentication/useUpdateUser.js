import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isLoadingUpdate } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success("User updated successfully");
            queryClient.invalidateQueries("user");
        },
        onError: (error) => {
            toast.error("Failed to edit user");
            console.error(error);
        },
    });

    return { updateUser, isLoadingUpdate };
}
