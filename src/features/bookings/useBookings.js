import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // Get the filter from the URL
    const currentFilter = searchParams.get("filter");
    const filter =
        !currentFilter || currentFilter === "all"
            ? null
            : { field: "status", value: currentFilter };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter],
        queryFn: () => getBookings({ filter }),
    });

    return { isLoading, bookings, error };
}
