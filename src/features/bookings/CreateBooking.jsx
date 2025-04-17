import { CreateBookingForm } from "./CreateBookingForm";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";

export function CreateBooking() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="bungalow-form">
                    <Button>Create Booking</Button>
                </Modal.Open>

                <Modal.Window name="bungalow-form">
                    <CreateBookingForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}
