import styled from "styled-components";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { Heading } from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
    /* Box */
    background-color: var(--color-gray-0);
    border: 1px solid var(--color-gray-100);
    border-radius: var(--border-radius-md);

    padding: 2.4rem 3.2rem;
    grid-column: 3 / span 2;

    & > *:first-child {
        margin-bottom: 1.6rem;
    }

    & .recharts-pie-label-text {
        font-weight: 600;
    }
`;

const startDataLight = [
    {
        duration: "1 night",
        value: 0,
        color: "#ef4444",
        strokeColor: "#991b1b",
    },
    {
        duration: "2 nights",
        value: 0,
        color: "#f97316",
        strokeColor: "#9a3412",
    },
    {
        duration: "3 nights",
        value: 0,
        color: "#eab308",
        strokeColor: "#a16207",
    },
    {
        duration: "4-5 nights",
        value: 0,
        color: "#84cc16",
        strokeColor: "#4d7c0f",
    },
    {
        duration: "6-7 nights",
        value: 0,
        color: "#22c55e",
        strokeColor: "#166534",
    },
    {
        duration: "8-14 nights",
        value: 0,
        color: "#14b8a6",
        strokeColor: "#0f766e",
    },
    {
        duration: "15-21 nights",
        value: 0,
        color: "#3b82f6",
        strokeColor: "#1e3a8a",
    },
    {
        duration: "21+ nights",
        value: 0,
        color: "#a855f7",
        strokeColor: "#6b21a8",
    },
];

const startDataDark = [
    {
        duration: "1 night",
        value: 0,
        color: "#b91c1c",
        strokeColor: "#f87171",
    },
    {
        duration: "2 nights",
        value: 0,
        color: "#c2410c",
        strokeColor: "#fb923c",
    },
    {
        duration: "3 nights",
        value: 0,
        color: "#a16207",
        strokeColor: "#facc15",
    },
    {
        duration: "4-5 nights",
        value: 0,
        color: "#4d7c0f",
        strokeColor: "#a3e635",
    },
    {
        duration: "6-7 nights",
        value: 0,
        color: "#15803d",
        strokeColor: "#4ade80",
    },
    {
        duration: "8-14 nights",
        value: 0,
        color: "#0f766e",
        strokeColor: "#5eead4",
    },
    {
        duration: "15-21 nights",
        value: 0,
        color: "#1d4ed8",
        strokeColor: "#60a5fa",
    },
    {
        duration: "21+ nights",
        value: 0,
        color: "#7e22ce",
        strokeColor: "#c084fc",
    },
];

function prepareData(startData, stays) {
    const durationMap = {
        "1 night": (num) => num === 1,
        "2 nights": (num) => num === 2,
        "3 nights": (num) => num === 3,
        "4-5 nights": (num) => [4, 5].includes(num),
        "6-7 nights": (num) => [6, 7].includes(num),
        "8-14 nights": (num) => num >= 8 && num <= 14,
        "15-21 nights": (num) => num >= 15 && num <= 21,
        "21+ nights": (num) => num >= 21,
    };

    const data = stays.reduce((arr, cur) => {
        const match = Object.keys(durationMap).find((key) =>
            durationMap[key](cur.num_nights)
        );
        if (match) {
            return arr.map((obj) =>
                obj.duration === match ? { ...obj, value: obj.value + 1 } : obj
            );
        }
        return arr;
    }, startData);

    return data.filter((obj) => obj.value > 0);
}

export function DurationChart({ confirmedStays }) {
    const { darkMode } = useDarkMode();
    const startData = darkMode ? startDataDark : startDataLight;
    const data = prepareData(startData, confirmedStays);

    return (
        <ChartBox>
            <Heading as="h2">Stay duration summary</Heading>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        nameKey="duration"
                        dataKey="value"
                        innerRadius={60}
                        outerRadius={110}
                        paddingAngle={5}
                    >
                        {data.map((entry) => (
                            <Cell
                                fill={entry.color}
                                stroke={entry.strokeColor}
                                strokeWidth={2}
                                key={entry.duration}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        verticalAlign="middle"
                        align="right"
                        width="35%"
                        layout="vertical"
                        iconType="circle"
                        iconSize={12}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartBox>
    );
}
