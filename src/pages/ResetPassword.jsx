import { Button, Input, VStack, Heading, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();

  return (
    <VStack spacing={4} align="center">
      <Heading>Reset Password</Heading>
      <Box as="form" style={{ width: "100%" }}>
        <VStack spacing={4} align="center">
          <Input
            type="email"
            placeholder="Enter your email"
            required
            {...register("email")}
          />
          <Button type="submit">Reset Password</Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default ResetPassword;
