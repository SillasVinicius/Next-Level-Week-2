import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string,
    label: string,
    options: Array<{
        value: string,
        label: string
    }>;
}

const Select: React.FC<SelectProps> = ({label, name, options, ...rest}) => {
  return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest} >
                <option value="" disabled hidden>Selecione um opção</option>

                {options.map(o => {
                    return <option key={o.value} value={o.value}>{o.label}</option>
                })}
            </select>
        </div>
    );
}

export default Select;