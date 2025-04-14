import {
    LuBanknote,
    LuBriefcaseBusiness,
    LuCalendarDays,
    LuChartLine,
} from "react-icons/lu";

import { Stat } from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export function Stats({ bookings, confirmedStays, numDays, numBungalows }) {
    const totalBookings = bookings.length;

    const sales = bookings.reduce((acc, booking) => {
        return acc + booking.total_price;
    }, 0);

    const checkins = (confirmedStays || []).length;

    const occupancyRate =
        confirmedStays.reduce((acc, stay) => {
            return acc + stay.num_nights;
        }, 0) /
        numDays /
        numBungalows;

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<LuBriefcaseBusiness />}
                value={totalBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<LuBanknote />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check-Ins"
                color="indigo"
                icon={<LuCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Ocupancy Rate"
                color="yellow"
                icon={<LuChartLine />}
                value={
                    occupancyRate ? `${Math.round(occupancyRate * 100)}%` : "-"
                }
            />
        </>
    );
}
