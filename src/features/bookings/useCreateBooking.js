import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings";

export function useCreateBooking() {
    const queryClient = useQueryClient();

    const { mutate: createBooking, isLoading: isLoadingCreate } = useMutation({
        mutationFn: createBookingApi,
        onSuccess: () => {
            toast.success("Booking created");
            queryClient.invalidateQueries("bookings");
        },
        onError: (error) => {
            toast.error("Failed to create booking");
            console.error(error);
        },
    });

    return { createBooking, isLoadingCreate };
}
