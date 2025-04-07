import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

export function SignupForm() {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { signup, isLoadingSignup } = useSignup();
    const { errors } = formState;

    function onSubmit({ full_name, email, password }) {
        // Call the signup API with the form data
        // useSignup() is a custom hook that uses react-query to call the signup API
        // and handle the response

        signup({ full_name, email, password }, { onSettled: reset });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors.full_name?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isLoadingSignup}
                    {...register("full_name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isLoadingSignup}
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Email address is invalid",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Password" error={errors.password?.message}>
                <Input
                    type="password"
                    id="password"
                    disabled={isLoadingSignup}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors.password_confirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isLoadingSignup}
                    {...register("password_confirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords do not match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    disabled={isLoadingSignup}
                >
                    Cancel
                </Button>
                <Button disabled={isLoadingSignup}>Create new user</Button>
            </FormRow>
        </Form>
    );
}
