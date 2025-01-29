import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // FILTER
    // Get the filter from the URL
    const currentFilter = searchParams.get("filter");
    const filter =
        !currentFilter || currentFilter === "all"
            ? null
            : { field: "status", value: currentFilter };

    // SORT
    const currentSort = searchParams.get("sort") || "start_date-desc";
    const [sortField, sortDirection] = currentSort.split("-");
    const sort = { field: sortField, direction: sortDirection };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sort],
        queryFn: () => getBookings({ filter, sort }),
    });

    return { isLoading, bookings, error };
}
