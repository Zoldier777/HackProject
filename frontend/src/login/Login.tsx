import { SubmitHandler, useForm } from "react-hook-form";

type IFormInput = {
    firstName: string;
    lastName: string;
    age: number;
};

const Login = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    return (
        <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName", { required: true, maxLength: 20 })} />
            <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
            <input type="number" {...register("age", { min: 18, max: 99 })} />
            <input type="submit" />
        </form>
        </div>
    );
};

export default Login;
