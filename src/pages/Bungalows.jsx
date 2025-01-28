import { Heading } from "../ui/Heading";
import { Row } from "../ui/Row";
import { BungalowTable } from "../features/bungalows/BungalowTable";
import { CreateBungalow } from "../features/bungalows/CreateBungalow";
import { BungalowTableOperations } from "../features/bungalows/BungalowTableOperations";

export function Bungalows() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Bungalows </Heading>
                <BungalowTableOperations />
            </Row>
            <Row>
                <BungalowTable />

                <CreateBungalow />
            </Row>
        </>
    );
}
