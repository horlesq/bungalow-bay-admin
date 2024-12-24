import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getBungalows } from "../services/apiBungalows";

export function Bungalows() {
    useEffect(() => {
        getBungalows().then((data) => console.log(data));
    }, []);

    return (
        <Row type="horizontal">
            <Heading as="h1">All Bungalows </Heading>
            <p>TEST</p>
        </Row>
    );
}
