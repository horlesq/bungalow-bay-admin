import { Sort } from "../../ui/Sort";
import { Filter } from "../../ui/Filter";
import { TableOperations } from "../../ui/TableOperations";

export function BookingTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField="status"
                options={[
                    { value: "all", label: "All" },
                    { value: "checked-out", label: "Checked out" },
                    { value: "checked-in", label: "Checked in" },
                    { value: "unconfirmed", label: "Unconfirmed" },
                ]}
            />

            <Sort
                options={[
                    {
                        value: "start_date-desc",
                        label: "Date: recent first",
                    },
                    {
                        value: "start_date-asc",
                        label: "Date: earlier first",
                    },
                    {
                        value: "total_price-desc",
                        label: "Amount: high to low",
                    },
                    {
                        value: "total_price-asc",
                        label: "Amount: low to high",
                    },
                ]}
            />
        </TableOperations>
    );
}
