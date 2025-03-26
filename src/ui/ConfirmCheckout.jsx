import styled from "styled-components";
import { Button } from "./Button";
import { Heading } from "./Heading";

const StyledConfirmDelete = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-gray-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

export function ConfirmCheckout({ bookingId, onConfirm, disabled, onClose }) {
    return (
        <StyledConfirmDelete>
            <Heading as="h3">Check out - Booking #{bookingId}</Heading>
            <p>
                Are you sure you want to check out this booking? This action
                cannot be undone.
            </p>

            <div>
                <Button
                    variation="secondary"
                    disabled={disabled}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variation="primary"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    Check out
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}
