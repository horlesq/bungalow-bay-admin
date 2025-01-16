import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { FileInput } from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { FormRow } from "../../ui/FormRow";
import { useCreateBungalow } from "./useCreateBungalow";
import { useUpdateBungalow } from "./useUpdateBungalow";

export function CreateBungalowForm({ bungalowToEdit = {} }) {
    const { id: editId, ...editValues } = bungalowToEdit || {};
    const isEditing = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditing ? editValues : {},
    });
    const { errors } = formState;

    const { isLoadingCreate, createBungalow } = useCreateBungalow();
    const { isLoadingUpdate, editBungalow } = useUpdateBungalow();

    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditing)
            editBungalow(
                { newBungalowData: { ...data, image }, id: editId },
                { onSuccess: () => reset() }
            );
        else
            createBungalow(
                { ...data, image: image },
                { onSuccess: () => reset() }
            );
    }

    function onError(errors) {
        console.error(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Bungalow name" error={errors.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isLoadingCreate || isLoadingUpdate}
                    {...register("name", {
                        required: "Field required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors.max_capacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isLoadingCreate || isLoadingUpdate}
                    {...register("max_capacity", {
                        required: "Field required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors.price?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isLoadingCreate || isLoadingUpdate}
                    {...register("price", {
                        required: "Field required",
                        min: {
                            value: 1,
                            message: "Price should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isLoadingCreate || isLoadingUpdate}
                    {...register("discount", {
                        required: "Field required",
                        validate: (value) =>
                            (value >= 0 && value <= getValues().price * 10) ||
                            "Discount should be between 0 and regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isLoadingCreate || isLoadingUpdate}
                    {...register("description", { required: "Field required" })}
                />
            </FormRow>

            <FormRow label="Bungalow image" error={errors.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    type="file"
                    {...register("image", {
                        required: isEditing ? false : "Field required",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button
                    disabled={isLoadingCreate || isLoadingUpdate}
                    type="submit"
                >
                    {isEditing ? "Edit bungalow" : "Add bungalow"}
                </Button>
            </FormRow>
        </Form>
    );
}
