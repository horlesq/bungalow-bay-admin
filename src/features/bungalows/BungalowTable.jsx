import styled from "styled-components";
import { Spinner } from "../../ui/Spinner";
import { BungalowRow } from "./BungalowRow";
import { useBungalows } from "./useBungalows";
import { Table } from "../../ui/Table";

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-gray-50);
    border-bottom: 1px solid var(--color-gray-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-gray-600);
    padding: 1.6rem 2.4rem;
`;

export function BungalowTable({ children }) {
    const { isLoading, bungalows } = useBungalows();

    if (isLoading) return <Spinner />;

    return (
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header>
                <div></div>
                <div>Bungalow</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>

            {bungalows.map((bungalow) => (
                <BungalowRow bungalow={bungalow} key={bungalow.id} />
            ))}
        </Table>
    );
}
