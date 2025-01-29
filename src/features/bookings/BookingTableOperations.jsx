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
                        value: "startDate-desc",
                        label: "Date: recent first",
                    },
                    {
                        value: "startDate-asc",
                        label: "Date: earlier first",
                    },
                    {
                        value: "totalPrice-desc",
                        label: "Amount: high to low",
                    },
                    {
                        value: "totalPrice-asc",
                        label: "Amount: low to high",
                    },
                ]}
            />
        </TableOperations>
    );
}
