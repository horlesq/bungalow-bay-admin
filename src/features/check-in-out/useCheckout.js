import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkout, isLoading: isLoadingCheckout } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-out",
            }),

        onSuccess: (data) => {
            toast.success(`Booking #${data.id} checked out`);
            queryClient.invalidateQueries({ active: true }); // Invalidate the active bookings query
            navigate("/bookings");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { checkout, isLoadingCheckout };
}
