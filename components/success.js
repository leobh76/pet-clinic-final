import { BiCheck } from "react-icons/bi";

export default function Success({ message }) {
  return (
    <div className="success container mx-auto">
      <div className="flex justify-center border border-green-200 bg-green-400 w-full text-gray-900 text-md my-1 py-2 text-center bg-opacity-5">
        {message} <BiCheck size={23} color={"rgb(34,197,94)"} />
      </div>
    </div>
  );
}