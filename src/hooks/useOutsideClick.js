import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapture = true) {
    const ref = useRef();

    useEffect(() => {
        function handleClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }

        document.addEventListener("click", handleClick, listenCapture);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [handler, listenCapture]);

    return ref;
}
