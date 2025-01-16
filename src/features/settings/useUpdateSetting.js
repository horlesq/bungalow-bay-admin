import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isLoading: isLoadingUpdate } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfully edited");
            queryClient.invalidateQueries("settings");
        },
        onError: (error) => {
            toast.error("Failed to edit setting");
            console.error(error);
        },
    });

    return { updateSetting, isLoadingUpdate };
}
