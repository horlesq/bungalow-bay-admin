import {Heading} from "../ui/Heading";
import { Row } from "../ui/Row";
import { BungalowTable } from "../features/bungalows/BungalowTable";
import { CreateBungalow } from "../features/bungalows/CreateBungalow";

export function Bungalows() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Bungalows </Heading>
                <p>filter/sort</p>
            </Row>
            <Row>
                <BungalowTable />

                <CreateBungalow />
            </Row>
        </>
    );
}
