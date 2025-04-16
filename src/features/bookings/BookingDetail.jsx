import styled from "styled-components";

import { BookingDataBox } from "./BookingDataBox";
import { Row } from "../../ui/Row";
import { Heading } from "../../ui/Heading";
import { Tag } from "../../ui/Tag";
import { ButtonGroup } from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import { ButtonText } from "../../ui/ButtonText";
import { Spinner } from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { Modal } from "../../ui/Modal";
import { MdDelete } from "react-icons/md";
import { ConfirmDelete } from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { ConfirmCheckout } from "../../ui/ConfirmCheckout";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

export function BookingDetail() {
    const { booking, isLoading } = useBooking();

    const moveBack = useMoveBack();
    const navigate = useNavigate();
    const { checkout, isLoadingCheckout } = useCheckout();
    const { deleteBooking, isLoadingDelete } = useDeleteBooking();

    if (isLoading) return <Spinner />;
    
    if (!booking) {
        throw new Error("Booking not found");
    }

    const { status, id: bookingId } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Modal>
                    <Modal.Open opens={"delete"}>
                        <Button variation="danger" icon={<MdDelete />}>
                            Delete booking
                        </Button>
                    </Modal.Open>

                    <Modal.Window name={"delete"}>
                        <ConfirmDelete
                            resourceName="booking"
                            disabled={isLoadingDelete}
                            onConfirm={() =>
                                deleteBooking(bookingId, {
                                    onSettled: () => navigate("/bookings"),
                                })
                            }
                        />
                    </Modal.Window>
                </Modal>

                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}

                {status === "checked-in" && (
                    <Modal>
                        <Modal.Open opens={"checkout"}>
                            <Button>Check out</Button>
                        </Modal.Open>

                        <Modal.Window name={"checkout"}>
                            <ConfirmCheckout
                                bookingId={bookingId}
                                disabled={isLoadingCheckout}
                                onConfirm={() => checkout(bookingId)}
                            />
                        </Modal.Window>
                    </Modal>
                )}

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}
