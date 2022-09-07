import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper";
import AddAppointmentForm from "./addAppointmentForm";

export function AddAppointmentModal({ formData, setFormData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0)
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
    <>
      <Button color="white" bg="purple.500" onClick={onOpen}>
        Add Appointment
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddAppointmentForm onSubmit={handleSubmit} setFormData={setFormData}/>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
