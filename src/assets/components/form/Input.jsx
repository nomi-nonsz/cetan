function Input ({ name, text, type, placeholder, refr, required }) {
    return (
        <div className="form-item" aria-required={required}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                ref={refr}
                placeholder={placeholder}
                id={name}
            />
        </div>
    )
}

export default Input;