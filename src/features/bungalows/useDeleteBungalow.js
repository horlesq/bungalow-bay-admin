import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBungalow as deleteBungalowApi } from "../../services/apiBungalows";
import toast from "react-hot-toast";

export function useDeleteBungalow() {
    const queryClient = useQueryClient();

    const { isLoading: isLoadingDelete, mutate: deleteBungalow } = useMutation({
        mutationFn: deleteBungalowApi,
        onSuccess: () => {
            toast.success("Bungalow deleted successfully.");
            queryClient.invalidateQueries("bungalows");
        },
        onError: (error) => {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        },
    });

    return { isLoadingDelete, deleteBungalow };
}
