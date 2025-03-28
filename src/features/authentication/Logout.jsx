import { IoIosLogOut } from "react-icons/io";

import { ButtonIcon } from "../../ui/ButtonIcon";
import { SpinnerMini } from "../../ui/SpinnerMini";

import { useLogout } from "./useLogout";

export function Logout() {
    const { logout, isLoadingLogout } = useLogout();

    return (
        <ButtonIcon disabled={isLoadingLogout} onClick={logout}>
            {!isLoadingLogout ? <IoIosLogOut /> : <SpinnerMini />}
        </ButtonIcon>
    );
}
