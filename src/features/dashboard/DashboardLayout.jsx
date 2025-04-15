import styled from "styled-components";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useBungalows } from "../bungalows/useBungalows";

import { Spinner } from "../../ui/Spinner";
import { Stats } from "./Stats";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export function DashboardLayout() {
    const { bookings, isLoading: isLoadingBookingsStats } = useRecentBookings();
    const {
        stays,
        confirmedStays,
        numDays,
        isLoading: isLoadingStaysStats,
    } = useRecentStays();
    const { bungalows, isLoading: isLoadingBungalows } = useBungalows();

    if (isLoadingBookingsStats || isLoadingStaysStats || isLoadingBungalows)
        return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                numBungalows={bungalows.length}
            />
        </StyledDashboardLayout>
    );
}
