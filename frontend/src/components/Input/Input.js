import React from 'react'

const Input = (props) => {
    
    const {
        mainClasses,
        labelName,
        inputType,
        inputValue,
        inputOnChange,
        inputOnBlur,
        inputHasError,
        errorMessage,
        inputId,
        disabled,
        tagType = 'input'
    } = props


    const renderProperInput=(type)=>{
        if(type ==='input'){
            return (
                <input
                type={inputType}
                id={inputId}
                value={inputValue}
                onChange={inputOnChange}
                onBlur={inputOnBlur}
                disabled={disabled}
              />
            )
        }
        else if(type ==='textarea'){
            return (
              <textarea
                type={inputType}
                id={inputId}
                rows="4"
                value={inputValue}
                onChange={inputOnChange}
                onBlur={inputOnBlur}
                disabled={disabled}
              />
            )
        }
    }

    
    
    return (
        <div className={mainClasses}>
                <label htmlFor={inputId}>{labelName}:</label>
                    {renderProperInput(tagType)}
                {inputHasError && <span className="error-text">{errorMessage}</span>}
        </div>
    )
}

export default Input
