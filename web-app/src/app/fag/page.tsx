"use client";

import { useState, useEffect } from "react";

export default function Fag() {

    const [ count, setCount ] = useState(0);
    const [ showText, setText ] = useState(false);

    useEffect(() => {
        if(count >= 5) setText(true);
    }, [count])

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click Me</button>
            <h1>{count}</h1>

            { showText && <p>Lets show some text</p>}
        </div>
    )
}