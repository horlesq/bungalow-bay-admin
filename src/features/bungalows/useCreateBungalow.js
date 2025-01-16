import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateBungalow } from "../../services/apiBungalows";

export function useCreateBungalow() {
    const queryClient = useQueryClient();

    const { mutate: createBungalow, isLoading: isLoadingCreate } = useMutation({
        mutationFn: createUpdateBungalow,
        onSuccess: () => {
            toast.success("Bungalow created");
            queryClient.invalidateQueries("bungalows");
        },
        onError: (error) => {
            toast.error("Failed to create bungalow");
            console.error(error);
        },
    });

    return { createBungalow, isLoadingCreate };
}
