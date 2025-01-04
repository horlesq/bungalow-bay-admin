import { useQuery } from "@tanstack/react-query";
import { getBungalows } from "../../services/apiBungalows";

export function useBungalows() {
    const {
        isLoading,
        data: bungalows,
        error,
    } = useQuery({ queryKey: ["bungalows"], queryFn: getBungalows });

    return { isLoading, bungalows, error };
}
