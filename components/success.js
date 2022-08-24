import { BiCheck } from "react-icons/bi";

export default function Success({ message }) {
  return (
    <div className="success container mx-auto">
      <div className="flex justify-center mx-auto border border-green-200 bg-green-400 w-1/2 text-gray-900 text-md my-4 py-2 text-center bg-opacity-5">
        {message} <BiCheck size={23} color={"rgb(34,197,94)"} />
      </div>
    </div>
  );
}