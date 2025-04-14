import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("filter")
        ? 7
        : searchParams.get("filter");

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: bookings, isLoading } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `filter-${numDays}`],
    });

    return { bookings, isLoading };
}
