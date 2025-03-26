import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { isLoading: isLoadingDelete, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Booking deleted successfully.");
            queryClient.invalidateQueries("bookings");
        },
        onError: (error) => {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        },
    });

    return { isLoadingDelete, deleteBooking };
}
