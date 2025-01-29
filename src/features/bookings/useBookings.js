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

    // PAGINATION
    const page = Number(searchParams.get("page")) || 1;

    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sort, page],
        queryFn: () => getBookings({ filter, sort, page }),
    });

    return { isLoading, bookings, error, count };
}
