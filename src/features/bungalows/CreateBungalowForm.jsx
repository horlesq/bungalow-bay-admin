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

const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-gray-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

export function CreateBungalowForm() {
    const { register, handleSubmit, reset } = useForm();
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

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Label htmlFor="name">Bungalow name</Label>
                <Input type="text" id="name" {...register("name")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register("max_capacity")}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input type="number" id="regularPrice" {...register("price")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount")}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description")}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Bungalow photo</Label>
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
