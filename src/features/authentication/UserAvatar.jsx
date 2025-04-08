import styled from "styled-components";
import { useUser } from "./useUser";
import { ButtonIcon } from "../../ui/ButtonIcon";

const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-gray-600);
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-gray-100);
`;

export function UserAvatar() {
    const { user } = useUser();
    const { full_name, avatar } = user.user_metadata;
    console.log(user);

    return (
        <StyledUserAvatar>
            <ButtonIcon>
                <Avatar
                    src={avatar || "default-user.jpg"}
                    alt={`Avatar of ${full_name}`}
                />
            </ButtonIcon>
            <span>{full_name}</span>
        </StyledUserAvatar>
    );
}
