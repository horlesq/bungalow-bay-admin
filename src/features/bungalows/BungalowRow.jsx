import styled from "styled-components";
import { IoDuplicate } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatCurrency } from "../../utils/helpers";
import { CreateBungalowForm } from "./CreateBungalowForm";
import { useDeleteBungalow } from "./useDeleteBungalow";
import { useCreateBungalow } from "./useCreateBungalow";
import { Modal } from "../../ui/Modal";
import { ConfirmDelete } from "../../ui/ConfirmDelete";
import { Table } from "../../ui/Table";
import { Menus } from "../../ui/Menus";

const Img = styled.img`
    display: block;
    width: 8rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Bungalow = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-gray-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

export function BungalowRow({ bungalow }) {
    const { isLoadingCreate, createBungalow } = useCreateBungalow();
    const { isLoadingDelete, deleteBungalow } = useDeleteBungalow();

    const {
        id,
        name,
        max_capacity: maxCapacity,
        price,
        discount,
        image,
        description,
    } = bungalow;

    function handleDuplicate() {
        createBungalow({
            name: `Copy of ${name}`,
            max_capacity: maxCapacity,
            price,
            discount,
            image,
            description,
        });
    }

    return (
        <Table.Row>
            <Img src={image} />
            <Bungalow>{name}</Bungalow>
            <div>Up to {maxCapacity} persons</div>
            <Price>{formatCurrency(price)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span></span>
            )}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={id} />
                        <Menus.List id={id}>
                            <Menus.Button
                                onClick={handleDuplicate}
                                icon={<IoDuplicate />}
                            >
                                Duplicate
                            </Menus.Button>

                            <Modal.Open opens="bungalow-form">
                                <Menus.Button icon={<MdModeEdit />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens={"delete"}>
                                <Menus.Button icon={<MdDelete />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        <Modal.Window name="bungalow-form">
                            <CreateBungalowForm bungalowToEdit={bungalow} />
                        </Modal.Window>

                        <Modal.Window name={"delete"}>
                            <ConfirmDelete
                                resourceName="bungalow"
                                disabled={isLoadingDelete}
                                onConfirm={() => deleteBungalow(id)}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}
