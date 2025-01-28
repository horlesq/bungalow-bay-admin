import { Filter } from "../../ui/Filter";
import { Sort } from "../../ui/Sort";
import { TableOperations } from "../../ui/TableOperations";

export function BungalowTableOperations() {
    return (
        <TableOperations>
            <Filter
                options={[
                    { value: "all", label: "All" },
                    { value: "no-discount", label: "No discount" },
                    { value: "with-discount", label: "With discount" },
                ]}
            />
            <Sort
                options={[
                    { value: "name-asc", label: "Name: A-Z" },
                    { value: "name-desc", label: "Name: Z-A" },
                    { value: "price-asc", label: "Price: low to high" },
                    { value: "price-desc", label: "Price: high to low" },
                    {
                        value: "max_capacity-asc",
                        label: "Capacity: low to high",
                    },
                    {
                        value: "max_capacity-desc",
                        label: "Capacity: high to low",
                    },
                ]}
            />
        </TableOperations>
    );
}
