const FormInput = ({ type, placeholder, name, register, error }: any) => {
	return (
		<div className="flex w-full flex-col px-2 py-1">
			<input
				type={type}
				placeholder={placeholder}
				{...register(name)}
				className="border-b-2 focus:outline-none"
			/>
			{error && (
				<span className="error text-xs text-primary">{error.message}</span>
			)}
		</div>
	);
};
export default FormInput;
