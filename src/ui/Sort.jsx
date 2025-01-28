import { useSearchParams } from "react-router-dom";
import { Select } from "./Select";

export function Sort({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSort = searchParams.get("sort");

    function handleChange(event) {
        searchParams.set("sort", event.target.value);
        setSearchParams(searchParams);
    }

    return (
        <Select
            options={options}
            type="white"
            value={currentSort}
            onChange={handleChange}
        />
    );
}
