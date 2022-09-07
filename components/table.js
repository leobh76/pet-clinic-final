import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../redux/reducer";
import {
  Input,
  Button,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

export default function Table() {
  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  if (isLoading) return <div>Appointments are loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <table className="min-w-full table-auto my-5">
      <thead>
        <tr className="bg-gray-800">
          <th className="align-top px-5 py-2">
            <span className="text-gray-200">Owner name</span>
            <br />
            <Input
              size="xs"
              bg="white"
              width="50"
              placeholder="Search for an owner..."
            />
          </th>
          <th className="align-top px-5 py-2">
            <span className="text-gray-200">Phone</span>
          </th>
          <th className="align-top px-5 py-2">
            <span className="text-gray-200">Pet name</span>
            <br />
            <Input
              size="xs"
              bg="white"
              width="50"
              placeholder="Search for an owner..."
            />
          </th>
          <th className="align-top px-5 py-2">
            <span className="text-gray-200">Pet age</span>
          </th>
          <th className="align-top px-5 py-2">
            <span className="text-gray-200 mr-2">Pet type</span>
            <Popover>
              <PopoverTrigger>
                <Button size="xs">˅</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Checkbox defaultChecked>Dog</Checkbox>
                </PopoverBody>
                <PopoverBody>
                  <Checkbox defaultChecked>Cat</Checkbox>
                </PopoverBody>
                <PopoverBody>
                  <Checkbox defaultChecked>Bird</Checkbox>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </th>
          <th className="align-top px-5 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ _id, ownerName, phone, petName, petAge, petType }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="border border-gray-300 bg-gray-50 text-center">
      <td className="text-md px-5 py-2 flex justify-center flex-row">
        <span className="text-center font-semibold">
          {ownerName || "Unknown"}
        </span>
      </td>
      <td className="text-md px-5 py-2">
        <span>{phone || "Unknown"}</span>
      </td>
      <td className="text-md px-5 py-2">
        <span>{petName || "Unknown"}</span>
      </td>
      <td className="text-md px-5 py-2">
        <span>{petAge || "Unknown"}</span>
      </td>
      <td className="text-md px-5 py-2">
        <span>{petType || "Unknown"}</span>
      </td>
      <td className="text-md px-5 py-2 flex justify-around gap-1">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={23} color="gray" />
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={23} color={"rgb(161, 32, 32)"} />
        </button>
      </td>
    </tr>
  );
}
