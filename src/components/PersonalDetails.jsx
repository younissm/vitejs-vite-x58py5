import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Container,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HiCreditCard } from "react-icons/hi2";

const PersonalDetails = () => {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <Container maxW="6xl" my="30px">
      <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="md">
        <VStack spacing="4">
          <FormControl id="firstName">
            <FormLabel>الاسم</FormLabel>
            <Input
              type="text"
              name="firstName"
              {...register("firstname", {
                required: "This field is required",
              })}
            />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>اللقب</FormLabel>
            <Input
              type="text"
              name="lastName"
              {...register("lastname", {
                required: "This field is required",
              })}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>البريد الالكتروني</FormLabel>
            <Input
              type="email"
              name="email"
              {...register("email", {
                required: "This field is required",
              })}
            />
          </FormControl>
          <FormControl id="phoneNumber">
            <FormLabel>رقم الهاتف</FormLabel>
            <Input type="tel" name="phoneNumber" {...register("phoneNumber")} />
          </FormControl>
          <FormControl id="address">
            <FormLabel>العنوان</FormLabel>
            <Input type="text" name="address" {...register("address")} />
          </FormControl>
          <Button
            type="submit"
            bg="purple.600"
            color="white"
            size="md"
            rounded="lg"
            _hover={{
              bg: "purple.800",
            }}
            rightIcon={<HiCreditCard size={24} />}
            aria-label="الدفع"
          >
            الدفع
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default PersonalDetails;
