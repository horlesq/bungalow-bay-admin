import styled from "styled-components";

import { useRecentBookings } from "./useRecentBookings";

import { Spinner } from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

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
        isLoading: isLoadingStaysStats,
    } = useRecentStays();

    if (isLoadingBookingsStats || isLoadingBookingsStats) return <Spinner />;
    console.log(bookings);
    console.log(confirmedStays);

    return (
        <StyledDashboardLayout>
            <div>Statistics</div>
            <div>Statistics</div>
            <div>Statistics</div>
            <div>Statistics</div>
        </StyledDashboardLayout>
    );
}
