export function Range({ id, label, value, min, max, onChange }) {
    return (
        <div>
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type="range"
                className="form-range"
                id={id}
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
