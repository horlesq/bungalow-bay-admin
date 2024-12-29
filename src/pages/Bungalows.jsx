import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { BungalowTable } from "../features/bungalows/BungalowTable";
import { Button } from "../ui/Button";
import { CreateBungalowForm } from "../features/bungalows/CreateBungalowForm";

export function Bungalows() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Bungalows </Heading>
                <p>filter/sort</p>
            </Row>
            <Row>
                <BungalowTable />

                <Button onClick={() => setShowForm((show) => !show)}>
                    Add bungalow
                </Button>

                {showForm && <CreateBungalowForm />}
            </Row>
        </>
    );
}
