import { BiEdit } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, getUsers, updateUser } from "../lib/helper";
import { useRouter } from "next/router";

export default function UpdateAppointmentForm({ formId, formData, setFormData }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
    getUser(formId)
  );

  const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const { ownerName, phone, petName, petAge, petBirthDate, petType } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updated = Object.assign(data, formData);
    console.log(updated);
    await UpdateMutation.mutate(updated);
  };

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="ownerName"
          placeholder="Owner's name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
          defaultValue={ownerName}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
          defaultValue={phone}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="petName"
          placeholder="Pet's name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
          defaultValue={petName}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="petAge"
          placeholder="Pet's age (e.g. 2 years and 3 months)"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
          defaultValue={petAge}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="petBirthDate"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
          defaultValue={petBirthDate}
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
            defaultChecked={petType == "Dog"}
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
            defaultChecked={petType == "Cat"}
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
            defaultChecked={petType == "Bird"}
          />
          <label htmlFor="radioDefault3" className="inline-block text-gray-800">
            Bird
          </label>
        </div>
      </div>

      <button
        onClick={() => router.reload()}
        className="flex justify-center text-md bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500"
      >
        Update
        <span className="px-1">
          <BiEdit size={23} />
        </span>
      </button>
    </form>
  );
}