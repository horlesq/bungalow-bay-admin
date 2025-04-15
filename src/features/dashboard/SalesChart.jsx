import styled from "styled-components";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useDarkMode } from "../../context/DarkModeContext";

import { DashboardBox } from "./DashboardBox";
import { Heading } from "../../ui/Heading";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-gray-300);
    }
`;

export function SalesChart({ bookings, numDays }) {
    const { darkMode } = useDarkMode();

    // Calculate total sales and extras sales
    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });

    const data = allDates.map((date) => {
        return {
            label: format(date, "MMM dd"),
            totalSales: bookings
                .filter((booking) =>
                    isSameDay(date, new Date(booking.created_at))
                )
                .reduce((acc, booking) => acc + booking.total_price, 0),
            extrasSales: bookings
                .filter((booking) =>
                    isSameDay(date, new Date(booking.created_at))
                )
                .reduce((acc, booking) => acc + booking.extras_price, 0),
        };
    });

    const colors = darkMode
        ? {
              totalSales: { stroke: "#80deea", fill: "#007c91" },
              extrasSales: { stroke: "#dcfce7", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              totalSales: { stroke: "#007c91", fill: "#80deea" },
              extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    return (
        <StyledSalesChart>
            <Heading as="h2">
                Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
                {format(allDates.at(-1), "MMM dd yyyy")}
            </Heading>
            <ResponsiveContainer width="100%">
                <AreaChart data={data}>
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        unit="€"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <CartesianGrid strokeDasharray="4" />
                    <Tooltip />
                    <Area
                        dataKey="totalSales"
                        type="monotone"
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        strokeWidth={2}
                        name="Total Sales"
                        unit="€"
                    />

                    <Area
                        dataKey="extrasSales"
                        type="monotone"
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        strokeWidth={2}
                        name="Extras Sales"
                        unit="€"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}
