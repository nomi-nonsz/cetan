import { useState } from "react";

function Input ({
    name,
    text,
    type,
    value,
    onChange,
    placeholder,
    refr,
    required
}) {
    const [thisValue, setvalue] = useState("");

    return (
        <div className="form-item" aria-required={required}>
            {text && <label htmlFor={name}>{text}</label>}
            <input
                type={type}
                ref={refr}
                value={value || thisValue}
                onChange={onChange || ((e) => { setvalue(e.target.value) })}
                placeholder={placeholder}
                id={name}
            />
        </div>
    )
}

export default Input;