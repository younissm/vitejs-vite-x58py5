import { useToast } from "@chakra-ui/react";

const SharedToast = ({ title, describtion, status, icon }) => {
  const toast = useToast();
  return toast({
    title,
    describtion,
    status,
    duration: 3000,
    isClosable: true,
    position: "top-right",
    icon,
  });
};

export default SharedToast;
