
interface IMyInputProps {
    register: any;
    type?: string;
    placeholder?: string;
    valueError?: string
    valueLabel?: string
    error?: any
    handleOnChange?: (value: any) => void
}

export const MyInput = ({ register ,type, placeholder, valueError , valueLabel, error, handleOnChange }:IMyInputProps) => {
    return (
        <>
            <label htmlFor={valueError} className="text-sm font-medium text-gray-300 mt-4"> { valueLabel } </label>
            <input onChange={handleOnChange} value={valueError}  placeholder={placeholder} type={type} {...register(valueError)}  className={`border p-2 w-96 mt-3 rounded-md focus:outline-none ${error ? "border-red-400" : "border-cyan-500"}`} />
        </>
    );
}