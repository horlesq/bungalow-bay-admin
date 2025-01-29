import { BookingRow } from "./BookingRow";
import { Table } from "../../ui/Table";
import { Menus } from "../../ui/Menus";
import { Empty } from "../../ui/Empty";
import { Spinner } from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import { Pagination } from "../../ui/Pagination";

export function BookingTable() {
    const { bookings, isLoading } = useBookings();

    if (isLoading) {
        return <Spinner />;
    }

    if (bookings.length === 0) {
        return <Empty resource="bookings" />;
    }
    //0.6fr 1.8fr 2.2fr 1fr 1fr 1fr
    return (
        <Menus>
            <Table columns="1fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Bungalow</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookings}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />

                <Table.Footer>
                    <Pagination count={5} />
                </Table.Footer>
            </Table>
        </Menus>
    );
}
