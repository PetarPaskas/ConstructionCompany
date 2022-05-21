import React from "react";

function FormInput({onChange, containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type}){
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