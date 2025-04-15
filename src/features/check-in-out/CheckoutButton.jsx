import { Button } from "../../ui/Button";
import { useCheckout } from "./useCheckout";

export function CheckoutButton({ bookingId }) {
    const { checkout, isLoadingCheckout } = useCheckout(bookingId);

    return (
        <Button
            variation="primary"
            size="small"
            onClick={() => checkout(bookingId)}
            disabled={isLoadingCheckout}
        >
            Check out
        </Button>
    );
}
