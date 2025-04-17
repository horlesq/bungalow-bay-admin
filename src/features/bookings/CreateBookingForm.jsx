import styled from "styled-components";

import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { FormRow } from "../../ui/FormRow";
import { useCreateBooking } from "./useCreateBooking";
import { useBungalows } from "../bungalows/useBungalows";
import { useSettings } from "../settings/useSettings";
import { useEffect, useState } from "react";

const StyledSelect = styled.select`
    width: 100%;
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    font-family: inherit;
    color: var(--color-gray-700);
    background-color: var(--color-gray-0);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--border-radius-sm);
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: var(--color-primary-700);
        box-shadow: 0 0 0 3px var(--color-primary-100);
    }
`;

const StyledOption = styled.option`
    font-size: 1.6rem;
    color: var(--color-gray-700);
    background-color: var(--color-gray-0);
`;

export function CreateBookingForm({ onClose }) {
    const { register, handleSubmit, reset, formState, watch } = useForm({});
    const { errors } = formState;

    const { bungalows, isLoading: isLoadingBungalows } = useBungalows();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    const [numNights, setNumNights] = useState(1);
    const [extrasPrice, setExtrasPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { isLoadingCreate, createBooking } = useCreateBooking();

    const numGuests = watch("num_guests", 1);
    const hasBreakfast = watch("has_breakfast", "false") === "true";
    const selectedBungalowId = watch("bungalow_id");
    const selectedBungalow = bungalows.find(
        (bungalow) => bungalow.id === Number(selectedBungalowId)
    );

    // Watch start_date and end_date fields
    const startDate = watch(
        "start_date",
        new Date().toISOString().split("T")[0]
    );
    const endDate = watch(
        "end_date",
        new Date(new Date().setDate(new Date().getDate() + 1))
            .toISOString()
            .split("T")[0]
    );

    // Calculate numNights whenever start_date or end_date changes
    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInTime = end - start;

        // Calculate the number of nights (ensure it's at least 1)
        const calculatedNights = Math.max(
            Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)),
            1
        );
        setNumNights(calculatedNights);
    }, [startDate, endDate]);

    // Calculate extrasPrice and totalPrice whenever numNights, numGuests, or hasBreakfast changes
    useEffect(() => {
        const calculatedExtrasPrice = hasBreakfast
            ? settings.breakfast_price * numNights * numGuests
            : 0;

        const calculatedTotalPrice =
            calculatedExtrasPrice +
            ((selectedBungalow?.price || 0) -
                (selectedBungalow?.discount || 0)) *
                numNights;

        setExtrasPrice(calculatedExtrasPrice);
        setTotalPrice(calculatedTotalPrice);
    }, [hasBreakfast, numNights, numGuests, selectedBungalow, settings]);

    if (isLoadingBungalows || isLoadingSettings) return null;

    function onSubmit(data) {
        console.log(data);
        createBooking(
            {
                ...data,
                status: "unconfirmed",
                num_nights: numNights,
                extras_price: extrasPrice,
                total_price: totalPrice,
                is_paid: false,
                bungalow_price: selectedBungalow.price,
            },

            {
                onSuccess: () => {
                    reset();
                    onClose?.();
                },
            }
        );
    }

    function onError(errors) {
        console.error(errors);
        throw new Error("Error creating booking");
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onClose ? "modal" : "regular"}
        >
            <FormRow label="Guest ID" error={errors.guest_id?.message}>
                <Input
                    type="number"
                    id="guest_id"
                    {...register("guest_id", {
                        required: "Guest ID is required",
                        min: {
                            value: 1,
                            message: "Guest ID must be a positive number",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Number of Guests"
                error={errors.num_guests?.message}
            >
                <Input
                    type="number"
                    id="num_guests"
                    defaultValue={1}
                    {...register("num_guests", {
                        required: "Number of guests is required",
                        min: {
                            value: 1,
                            message: "Number of guests must be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Bungalow" error={errors.bungalow_id?.message}>
                <StyledSelect
                    id="bungalow_id"
                    {...register("bungalow_id", {
                        required: "Please select a bungalow",
                    })}
                >
                    <StyledOption value={null}>Select a bungalow</StyledOption>
                    {bungalows.map((bungalow) => (
                        <StyledOption key={bungalow.id} value={bungalow.id}>
                            {bungalow.id} - {bungalow.name}
                        </StyledOption>
                    ))}
                </StyledSelect>
            </FormRow>

            <FormRow label="Start Date" error={errors.start_date?.message}>
                <Input
                    type="date"
                    id="start_date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    {...register("start_date", {
                        required: "Start date is required",
                    })}
                />
            </FormRow>

            <FormRow label="End Date" error={errors.end_date?.message}>
                <Input
                    type="date"
                    id="end_date"
                    defaultValue={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                            .toISOString()
                            .split("T")[0]
                    } // Default to tomorrow's date
                    {...register("end_date", {
                        required: "End date is required",
                    })}
                />
            </FormRow>

            <FormRow label="Breakfast Option" error={errors.breakfast?.message}>
                <StyledSelect
                    id="has_breakfast"
                    {...register("has_breakfast", {
                        required: "Please select a breakfast option",
                    })}
                >
                    <StyledOption value="">Include Breakfast?</StyledOption>
                    <StyledOption value="true">Yes</StyledOption>
                    <StyledOption value="false">No</StyledOption>
                </StyledSelect>
            </FormRow>

            <FormRow label="Extras Price" error={errors.extras_price?.message}>
                <Input
                    type="number"
                    id="extras_price"
                    value={extrasPrice}
                    {...register("extras_price", {
                        required: "Extras price is required",
                    })}
                    readOnly
                />
            </FormRow>

            <FormRow label="Total Price" error={errors.total_price?.message}>
                <Input id="total_price" value={totalPrice} readOnly />
            </FormRow>

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onClose?.()}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoadingCreate}>
                    Create Booking
                </Button>
            </FormRow>
        </Form>
    );
}
