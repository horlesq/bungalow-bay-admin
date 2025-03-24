import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isLoading: isLoadingCheckin } = useMutation({
        mutationFn: ({ bookingId, breakfast }) =>
            updateBooking(bookingId, {
                status: "checked-in",
                is_paid: true,
                ...breakfast,
            }),

        onSuccess: (data) => {
            toast.success(`Booking #${data.id} checked in`);
            queryClient.invalidateQueries({ active: true }); // Invalidate the active bookings query
            navigate("/bookings");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { checkin, isLoadingCheckin };
}
