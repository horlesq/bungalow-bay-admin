import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateBungalow } from "../../services/apiBungalows";
import toast from "react-hot-toast";

export function useUpdateBungalow() {
    const queryClient = useQueryClient();

    const { mutate: updateBungalow, isLoading: isLoadingUpdate } = useMutation({
        mutationFn: ({ newBungalowData, id }) =>
            createUpdateBungalow(newBungalowData, id),
        onSuccess: () => {
            toast.success("Bungalow edited");
            queryClient.invalidateQueries("bungalows");
        },
        onError: (error) => {
            toast.error("Failed to edit bungalow");
            console.error(error);
        },
    });

    return { updateBungalow, isLoadingUpdate };
}
