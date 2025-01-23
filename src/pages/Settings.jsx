import { UpdateSettingsForm } from "../features/settings/UpdateSettingsForm";
import {Heading} from "../ui/Heading";
import { Row } from "../ui/Row";

export function Settings() {
    return (
        <Row>
            <Heading as="h1">Update resort settings</Heading>
            <UpdateSettingsForm />
        </Row>
    );
}
