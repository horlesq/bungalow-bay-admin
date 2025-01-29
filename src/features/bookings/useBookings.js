import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
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

    // QUERY
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sort, page],
        queryFn: () => getBookings({ filter, sort, page }),
    });

    // PRE-FETCHING
    // Pre-fetch the next and previous pages
    if (page < Math.ceil(count / PAGE_SIZE))
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sort, page + 1],
            queryFn: () => getBookings({ filter, sort, page: page + 1 }),
        });
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sort, page - 1],
            queryFn: () => getBookings({ filter, sort, page: page - 1 }),
        });

    return { isLoading, bookings, error, count };
}
