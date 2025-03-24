import styled from "styled-components";

import { BookingDataBox } from "../../features/bookings/BookingDataBox";
import { Row } from "../../ui/Row";
import { Heading } from "../../ui/Heading";
import { ButtonGroup } from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import { ButtonText } from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { Spinner } from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { Checkbox } from "../../ui/Checkbox";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
    /* Box */
    background-color: var(--color-gray-0);
    border: 1px solid var(--color-gray-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

export function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const { booking, isLoading } = useBooking();
    const moveBack = useMoveBack();
    const { checkin, isLoadingCheckin } = useCheckin();

    useEffect(() => {
        setConfirmPaid(booking?.is_paid || false);
    }, [booking]);

    if (isLoading) return <Spinner />;

    const {
        id: bookingId,
        guests,
        total_price: totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    function handleCheckin() {
        if (!confirmPaid) return;
        checkin(bookingId);
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    disabled={booking.is_paid || isLoadingCheckin}
                    id="confirmPaid"
                >
                    I confirm that <b>{guests.full_name}</b>paid the total
                    amount of {formatCurrency(totalPrice)}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isLoadingCheckin}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}
