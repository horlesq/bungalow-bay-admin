import styled from "styled-components";

import { Input } from "../../ui/Input";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { FileInput } from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBungalow } from "../../services/apiBungalows";
import { FormRow } from "../../ui/FormRow";

export function CreateBungalowForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: createBungalow,
        onSuccess: () => {
            toast.success("Bungalow created");
            queryClient.invalidateQueries("bungalows");
            reset();
        },
        onError: (error) => {
            toast.error("Failed to create bungalow");
            console.error(error);
        },
    });

    function onSubmit(data) {
        mutate(data);
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                    {...register("discount", {
                        required: "Field required",
                        validate: (value) =>
                            (value >= 0 && value <= getValues().price) ||
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
                    disabled={isLoading}
                    {...register("description", { required: "Field required" })}
                />
            </FormRow>

            <FormRow label="Bungalow image" error={errors.image?.message}>
                <FileInput id="image" accept="image/*" />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isLoading}>Add bungalow</Button>
            </FormRow>
        </Form>
    );
}
