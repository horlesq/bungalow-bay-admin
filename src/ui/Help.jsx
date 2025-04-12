import { useState } from "react";
import { ButtonIcon } from "./ButtonIcon";
import { LuCircleHelp } from "react-icons/lu";
import styled from "styled-components";
import { Button } from "./Button";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    backdrop-filter: blur(5px); /* Blurs the background */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Ensure it appears on top */
`;

const ModalContent = styled.div`
    background: var(--color-gray-0);
    padding: 2rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-lg);
    width: 90%;
    text-align: center;
`;

const ModalHeading = styled.h2`
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 1.6rem;
    color: var(--color-gray-900); /* Make the heading stand out */
`;

const ModalParagraph = styled.p`
    margin-bottom: 2rem;
    font-size: 1.6rem;
    color: var(--color-gray-600);
`;

const ModalList = styled.ul`
    list-style: disc;
    padding-left: 2rem;
    margin-bottom: 2rem;
`;

const ModalListItem = styled.li`
    margin-bottom: 1rem;
    font-size: 1.6rem;
    color: var(--color-gray-700);
`;

export function Help() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <ButtonIcon onClick={openModal}>
                <LuCircleHelp />
            </ButtonIcon>

            {isModalOpen && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeading>Help Guide</ModalHeading>
                        <ModalParagraph>
                            Welcome to the Bungalow Bay Dashboard! Here’s a
                            guide to help you navigate the app:
                        </ModalParagraph>
                        <ModalList>
                            <ModalListItem>
                                <strong>Dashboard Page:</strong> This is the
                                main page where you can view key metrics and
                                insights about your resort&apos;s performance.
                                Use filters to view data for specific time
                                periods (e.g., last 7 days, 30 days, etc.).
                            </ModalListItem>
                            <ModalListItem>
                                <strong>Bookings Page:</strong> View detailed
                                information about individual bookings. You can
                                check guest details, booking dates, and payment
                                status.
                            </ModalListItem>
                            <ModalListItem>
                                <strong>Bungalows Page:</strong> Manage all
                                bungalows in your resort. You can view a list of
                                bungalows, create new ones, and perform
                                operations like editing or deleting existing
                                bungalows.
                            </ModalListItem>
                            <ModalListItem>
                                <strong>Users Page:</strong> Create and manage
                                user accounts for your staff. Assign roles and
                                permissions to ensure secure access to the
                                dashboard.
                            </ModalListItem>
                            <ModalListItem>
                                <strong>Settings Page:</strong> Update resort
                                settings, such as contact information, policies,
                                and other configurations.
                            </ModalListItem>
                        </ModalList>
                        <Button onClick={closeModal}>Close</Button>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
}
