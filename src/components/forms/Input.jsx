import { forwardRef, useId } from 'react';

export const Input = forwardRef(({ placeholder, value, onChange, label }, ref) => {
    const id = useId();

    return (
        <div>
            <label className="form-label" htmlFor={id}>
                {label}
            </label>
            <input
                ref={ref}
                id={id}
                className="form-control"
                value={value}
                placeholder={placeholder}
                onChange={(e) => (onChange ? onChange(e.target.value) : null)}
            />
        </div>
    );
});

// use to have component name inside devtools
Input.displayName = 'Input';
