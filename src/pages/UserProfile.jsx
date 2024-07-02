import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMyUser, updateUser } from "../services/apiUsers";
import CustomeModal from "../shared/Modal";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

const UserProfile = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery("users", getMyUser);
  console.log(data);
  const userId = data?.id;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    const username = `${data.firstname} ${data.lastname}`;
    const formData = new FormData();
    formData.append("username", username);
    mutateUpdate({ id: userId, body: formData });
  }

  const { isLoading: isUpdating, mutate: mutateUpdate } = useMutation(
    updateUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    }
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };

  return (
    <>
      <Box p={4}>
        <Heading
          fontSize={{ base: "x-large", lg: "xxx-large" }}
          mb="20px"
          position="relative"
          display="inline-block"
        >
          حساب المستخدم
          <Box
            position="absolute"
            bottom="-5px"
            left="50%"
            transform="translateX(-50%)"
            width="100%"
            height="3px"
            backgroundColor="purple.600"
          />
        </Heading>

        <Box mt={4}>
          <Text mb="3">
            <strong>اسم المستخدم: {data?.username}</strong>
          </Text>
          <Text mb="3">
            <strong>البريد الالكتروني: {data?.email}</strong>
          </Text>
          <Text mb="3">
            <strong>تاريخ الانشاء: {formatDate(data?.createdAt)}</strong>
          </Text>
          <Text mb="3">
            <strong>اخر تعديل : {formatDate(data?.updatedAt)}</strong>
          </Text>
        </Box>
        <Button
          mt={4}
          backgroundColor="purple.600"
          color="white"
          size="large"
          p="5"
          _hover={{ backgroundColor: "purple.800" }}
          onClick={() => onOpen()}
        >
          تعديل الحساب
        </Button>
      </Box>
      <CustomeModal
        isModalOpen={isOpen}
        onModalOpen={onOpen}
        onModalClose={onClose}
        title={"تعديل المستخدم"}
        okTxt="تعديل"
        cancelTxt="الغاء"
        loading={isUpdating}
        mutate={mutateUpdate}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl>
          <FormLabel>الاسم</FormLabel>
          <Input
            placeholder="الاسم"
            id="firstname"
            {...register("firstname")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>اللقب</FormLabel>
          <Input placeholder="اللقب" id="lastname" {...register("lastname")} />
        </FormControl>
      </CustomeModal>
    </>
  );
};

export default UserProfile;
