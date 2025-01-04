import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBungalow } from "../../services/apiBungalows";
import toast from "react-hot-toast";

export function useEditBungalow() {
    const queryClient = useQueryClient();

    const { mutate: editBungalow, isLoading: isLoadingEdit } = useMutation({
        mutationFn: ({ newBungalowData, id }) =>
            createEditBungalow(newBungalowData, id),
        onSuccess: () => {
            toast.success("Bungalow edited");
            queryClient.invalidateQueries("bungalows");
        },
        onError: (error) => {
            toast.error("Failed to edit bungalow");
            console.error(error);
        },
    });

    return { editBungalow, isLoadingEdit };
}
