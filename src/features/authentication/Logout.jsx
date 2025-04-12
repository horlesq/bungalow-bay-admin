import { ButtonIcon } from "../../ui/ButtonIcon";
import { SpinnerMini } from "../../ui/SpinnerMini";

import { useLogout } from "./useLogout";
import { LuLogOut } from "react-icons/lu";

export function Logout() {
    const { logout, isLoadingLogout } = useLogout();

    return (
        <ButtonIcon disabled={isLoadingLogout} onClick={logout}>
            {!isLoadingLogout ? <LuLogOut /> : <SpinnerMini />}
        </ButtonIcon>
    );
}
