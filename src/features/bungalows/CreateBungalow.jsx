import { useState } from "react";
import { CreateBungalowForm } from "./CreateBungalowForm";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";

export function CreateBungalow() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpenModal((open) => !open)}>
                Add bungalow
            </Button>

            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateBungalowForm onClose={() => setIsOpenModal(false)} />
                </Modal>
            )}
        </div>
    );
}
