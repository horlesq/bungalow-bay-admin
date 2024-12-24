import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Spinner } from "../../ui/Spinner";
import { getBungalows } from "../../services/apiBungalows";
import { BungalowRow } from "./BungalowRow";

const Table = styled.div`
    border: 1px solid var(--color-gray-200);

    font-size: 1.4rem;
    background-color: var(--color-gray-0);
    border-radius: 7px;
    overflow: hidden;
`;

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
    const {
        isLoading,
        data: bungalows,
        error,
    } = useQuery({ queryKey: ["bungalow"], queryFn: getBungalows });

    if (isLoading) return <Spinner />;

    return (
        <Table role="table">
            <TableHeader role="row">
                <div></div>
                <div>Bungalow</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </TableHeader>

            {bungalows.map((bungalow) => (
                <BungalowRow bungalow={bungalow} key={bungalow.id} />
            ))}
        </Table>
    );
}
