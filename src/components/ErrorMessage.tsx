import { ErrorIcon } from "./Icons/ErrorIcon";

export const ErrorMessage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center p-20">
      <ErrorIcon className="h-[200px] w-[200px]" />
      <p className="md:text-4xl text-xl font-medium text-center">
        Connection error.
        <br />
        Please try again later.
      </p>
    </div>
  );
};
