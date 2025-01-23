import { CreateBungalowForm } from "./CreateBungalowForm";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";

export function CreateBungalow() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="bungalow-form">
                    <Button>Add bungalow</Button>
                </Modal.Open>

                <Modal.Window name="bungalow-form">
                    <CreateBungalowForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}
