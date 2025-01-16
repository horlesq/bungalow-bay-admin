import { Form } from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import { Spinner } from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

export function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            min_booking_length: minBookingLength,
            max_booking_length: maxBookingLength,
            max_guests_per_booking: maxGuestsPerBooking,
            breakfast_price: breakfastPrice,
        } = {},
    } = useSettings();

    const { isLoadingUpdate, updateSetting } = useUpdateSetting();

    if (isLoading) {
        return <Spinner />;
    }

    function handleUpdateSetting(event, setting) {
        const { value } = event.target;
        if (!value) return;
        updateSetting({ [setting]: value });
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    disabled={isLoadingUpdate}
                    onBlur={(event) =>
                        handleUpdateSetting(event, "min_booking_length")
                    }
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                    disabled={isLoadingUpdate}
                    onBlur={(event) =>
                        handleUpdateSetting(event, "max_booking_length")
                    }
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking}
                    disabled={isLoadingUpdate}
                    onBlur={(event) =>
                        handleUpdateSetting(event, "max_guests_per_booking")
                    }
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                    disabled={isLoadingUpdate}
                    onBlur={(event) =>
                        handleUpdateSetting(event, "breakfast_price")
                    }
                />
            </FormRow>
        </Form>
    );
}
