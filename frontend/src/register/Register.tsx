import { useForm } from "react-hook-form";

type IFormInput = {
  firstName: string;
  lastName: string;
  age: number;
  example: string;
}

const Register = () => {
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
          <label>First Name</label>
          <div className="relative">
            <input
              {...register("firstName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i
              })}
              className="w-full border-2 border-gray-300 rounded-lg p-2"
            />
            
          </div>
          {errors?.firstName?.type === "required" && <p>This field is required</p>}
          {errors?.firstName?.type === "maxLength" && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.firstName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
        </div>
        <div className="flex flex-col w-full md:w-auto">
          <label>Last Name</label>
          <div className="relative">
            <input
              {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })}
              className="w-full border-2 border-gray-300 rounded-lg p-2"
            />
            <div className="absolute inset-0 border-2 border-gray-300 rounded-lg pointer-events-none"></div>
          </div>
          {errors?.lastName?.type === "required" && <p>This field is required</p>}
          {errors?.lastName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
        </div>
        <div className="flex flex-col w-full md:w-auto">
          <label>Age</label>
          <div className="relative">
            <input
              {...register("age", { required: true, min: 18, max: 99 })}
              className="w-full border-2 border-gray-300 rounded-lg p-2"
            />
            <div className="absolute inset-0 border-2 border-gray-300 rounded-lg pointer-events-none"></div>
          </div>
          {errors?.age?.type === "required" && <p>This field is required</p>}
          {errors?.age && (
            <p>You must be older than 18 and younger than 99 years old</p>
          )}
        </div>

        <input type="number" {...register("age", { min: 18, max: 99 })} />

        <input className="w-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit" />
      </form>
    </div>
  );
};

export default Register;
