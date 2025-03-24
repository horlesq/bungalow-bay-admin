import styled from "styled-components";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

import { BookingDataBox } from "../../features/bookings/BookingDataBox";
import { Row } from "../../ui/Row";
import { Heading } from "../../ui/Heading";
import { ButtonGroup } from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import { ButtonText } from "../../ui/ButtonText";
import { Spinner } from "../../ui/Spinner";
import { Checkbox } from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
    /* Box */
    background-color: var(--color-gray-0);
    border: 1px solid var(--color-gray-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

export function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState();
    const { booking, isLoading } = useBooking();
    const { checkin, isLoadingCheckin } = useCheckin();
    const { settings, isLoading: isLoadingSettings } = useSettings();
    const moveBack = useMoveBack();

    // Update the confirmPaid state when the booking changes
    useEffect(() => {
        setConfirmPaid(booking?.is_paid || false);
    }, [booking]);

    if (isLoading || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        total_price: totalPrice,
        num_guests: numGuests,
        has_breakfast: hasBreakfast,
        num_nights: numNights,
    } = booking;

    const optionalBreakfastPrice =
        settings.breakfast_price * numGuests * numNights;

    function handleCheckin() {
        if (!confirmPaid) return;

        // If the user wants to add breakfast, update the booking with the breakfast details
        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    has_breakfast: true,
                    extras_price: optionalBreakfastPrice,
                    total_price: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkin({ bookingId, breakfast: { has_breakfast: false } });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);
                            setConfirmPaid(false);
                        }}
                        id="addBreakfast"
                    >
                        Add breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    disabled={isLoadingCheckin}
                    id="confirmPaid"
                >
                    I confirm that <b>{guests.full_name}</b>paid the total
                    amount of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : formatCurrency(totalPrice + optionalBreakfastPrice)}
                    .{" "}
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
