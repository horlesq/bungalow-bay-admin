import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import { Button } from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { guests } from "./data-guests";
import { useBungalows } from "../features/bungalows/useBungalows";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
    const { error } = await supabase.from("guests").delete().gt("id", 0);
    if (error) console.log(error.message);
}

async function deleteBookings() {
    const { error } = await supabase.from("bookings").delete().gt("id", 0);
    if (error) console.log(error.message);
}

async function createGuests() {
    const { error } = await supabase.from("guests").insert(guests);
    if (error) console.log(error.message);
}

async function createBookings({ bungalows }) {
    // Bookings need a guestId and a bungalowId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and bungalowIds, and then replace the original IDs in the booking data with the actual ones from the DB
    const { data: guestsIds } = await supabase
        .from("guests")
        .select("id")
        .order("id");
    const allGuestIds = guestsIds.map((bungalow) => bungalow.id);
    const { data: bungalowsIds } = await supabase
        .from("bungalows")
        .select("id")
        .order("id");
    const allBungalowIds = bungalowsIds.map((bungalow) => bungalow.id);

    const finalBookings = bookings.map((booking) => {
        // Here relying on the order of bungalows, as they don't have and ID yet
        const bungalow = bungalows.at(booking.bungalow_id - 1);
        const numNights = subtractDates(booking.end_date, booking.start_date);
        const bungalowPrice = numNights * (bungalow.price - bungalow.discount);
        const extrasPrice = booking.has_breakfast
            ? numNights * 15 * booking.num_guests
            : 0; // hardcoded breakfast price
        const totalPrice = bungalowPrice + extrasPrice;

        let status;
        if (
            isPast(new Date(booking.end_date)) &&
            !isToday(new Date(booking.end_date))
        )
            status = "checked-out";
        if (
            isFuture(new Date(booking.start_date)) ||
            isToday(new Date(booking.start_date))
        )
            status = "unconfirmed";
        if (
            (isFuture(new Date(booking.end_date)) ||
                isToday(new Date(booking.end_date))) &&
            isPast(new Date(booking.start_date)) &&
            !isToday(new Date(booking.start_date))
        )
            status = "checked-in";

        return {
            ...booking,
            num_nights: numNights,
            bungalow_price: bungalowPrice,
            extras_price: extrasPrice,
            total_price: totalPrice,
            guest_id: allGuestIds.at(booking.guest_id - 1),
            bungalow_id: allBungalowIds.at(booking.bungalow_id - 1),
            status,
        };
    });

    console.log(finalBookings);

    const { error } = await supabase.from("bookings").insert(finalBookings);
    if (error) console.log(error.message);
}

export function Uploader() {
    const { bungalows } = useBungalows();
    const [isLoading, setIsLoading] = useState(false);

    async function uploadAll() {
        setIsLoading(true);
        // Bookings need to be deleted FIRST
        await deleteBookings();
        await deleteGuests();

        // Bookings need to be created LAST
        await createGuests();
        await createBookings({ bungalows });

        setIsLoading(false);
    }

    async function uploadBookings() {
        setIsLoading(true);
        await deleteBookings();
        await createBookings({ bungalows });
        setIsLoading(false);
    }

    return (
        <div
            style={{
                marginTop: "auto",
                backgroundColor: "#e0e7ff",
                padding: "8px",
                borderRadius: "5px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}
        >
            <h3>SAMPLE DATA</h3>

            <Button onClick={uploadAll} disabled={isLoading}>
                Upload ALL
            </Button>

            <Button onClick={uploadBookings} disabled={isLoading}>
                Upload bookings ONLY
            </Button>
        </div>
    );
}
