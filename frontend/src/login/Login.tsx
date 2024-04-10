import { useForm } from "react-hook-form";

type IFormInput = {
  email: string;
  password: string;

}

const Login = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    reset();
    alert(JSON.stringify(data));
  };

  return (
    <div className="w-full md:w-auto flex items-center justify-center h-screen">
      <form className="space-y-4 md:space-y-6 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full md:w-auto">
          <label>Email
          </label>
          <div className="relative">
            <input
              {...register("email", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i
              })}
              className="w-full border-2 border-gray-300 rounded-lg p-2"
            />
            
          </div>
          {errors?.email?.type === "required" && <p>This field is required</p>}
          {errors?.email?.type === "maxLength" && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
        </div>
        <div className="flex flex-col w-full md:w-auto">
          <label>password</label>
          <div className="relative">
            <input
              {...register("password", { required: true, pattern: /^[A-Za-z]+$/i })}
              className="w-full border-2 border-gray-300 rounded-lg p-2"
            />
            <div className="absolute inset-0 border-2 border-gray-300 rounded-lg pointer-events-none"></div>
          </div>
          {errors?.password?.type === "required" && <p>This field is required</p>}
        </div>
   

        <input className="w-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit" />
      </form>
    </div>
  );
};

export default Login;
