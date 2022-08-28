import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper";

export default function AddAppointmentForm({ formData, setFormData }) {
  const queryClient = useQueryClient();

  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return alert("Can't submit empty appointment!");

    let { ownerName, phone, petName, petAge, petBirthDate, petType } = formData;

    const model = {
      ownerName,
      phone,
      petName,
      petAge,
      petBirthDate,
      petType,
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading...</div>;
  if (addMutation.isError) return <Bug message={addMutation.error.message} />;
  if (addMutation.isSuccess)
    return <Success message={"Added successfully!"}></Success>;

  return (
    <form className="grid grid-cols-2 w-full gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="ownerName"
          placeholder="Owner's name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="petName"
          placeholder="Pet's name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="petAge"
          placeholder="Pet's age (e.g. 2 years and 3 months)"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="petBirthDate"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            value="Dog"
            id="radioDefault1"
            name="petType"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg contain float-left mr-2 cursor-pointer"
            onChange={setFormData}
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Dog
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            value="Cat"
            id="radioDefault2"
            name="petType"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg contain float-left mr-2 cursor-pointer"
            onChange={setFormData}
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Cat
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            value="Bird"
            id="radioDefault3"
            name="petType"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg contain float-left mr-2 cursor-pointer"
            onChange={setFormData}
          />
          <label htmlFor="radioDefault3" className="inline-block text-gray-800">
            Bird
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="flex justify-center text-md bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
      >
        Add
        <span className="px-1">
          <BiPlus size={23} />
        </span>
      </button>
    </form>
  );
}