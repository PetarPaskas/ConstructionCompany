import React from "react";

function FormInput({onChange, containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type, isDisabled}){
    const idGen = `${Math.ceil(Math.random()*1000)}-${name}`;
    return(
    <div className={`form-input ${containerClassNameAppender ?? ""}`}>
        <input 
            type={`${type ?? "text"}`} 
            placeholder={labelPlaceholder} 
            onChange={onChange}
            className="form-input__input" 
            name={name} 
            id={idGen}
            value={value ?? ""}
            disabled={isDisabled}
            />
        <label 
            className="form-input__label" 
            htmlFor={idGen}>
                {labelPlaceholder}
        </label>
        <small 
            className="form-input__error"
            >
            {errorMessage ?? ""}
        </small>
    </div>);
}

export default FormInput;