import { Spinner } from "../../ui/Spinner";
import { BungalowRow } from "./BungalowRow";
import { useBungalows } from "./useBungalows";
import { Table } from "../../ui/Table";
import { Menus } from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export function BungalowTable() {
    const { isLoading, bungalows } = useBungalows();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    // FILTER
    // Get the filter value from the URL
    const filterValue = searchParams.get("filter") || "all";

    // Filter the bungalows based on the filter value
    let filteredBungalows = bungalows;
    if (filterValue === "all") filteredBungalows = bungalows;
    if (filterValue === "no-discount")
        filteredBungalows = bungalows.filter(
            (bungalow) => bungalow.discount === 0
        );
    if (filterValue === "with-discount")
        filteredBungalows = bungalows.filter(
            (bungalow) => bungalow.discount > 0
        );

    // SORT
    // Get the sort value from the URL
    const sortValue = searchParams.get("sort") || "name-asc";
    const [sortKey, sortDirection] = sortValue.split("-");

    // Sort the bungalows based on the sort value
    const modifier = sortDirection === "asc" ? 1 : -1;
    const sortBungalows = filteredBungalows.sort(
        (a, b) => (a[sortKey] - b[sortKey]) * modifier
    );

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Bungalow</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={sortBungalows}
                    render={(bungalow) => (
                        <BungalowRow bungalow={bungalow} key={bungalow.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}
