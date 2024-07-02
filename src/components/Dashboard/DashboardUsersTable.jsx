import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { BiTrash } from "react-icons/bi";
import CustomeAlertDialog from "../../shared/AlretDialog";
import { deleteUser, getUsersList } from "../../services/apiUsers";
import { format } from "date-fns";

const DashboardUsersTable = () => {
  const [clickedUserId, setClickedUserId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const { data: reviewsData } = useQuery("users", getUsersList);

  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteUser(clickedUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return format(date, "dd/MM/yyyy HH:mm");
  };
  return (
    <>
      <TableContainer>
        <Table variant="simple" my={5}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>اسم المستخدم</Th>
              <Th>البريد الالكتروني</Th>
              <Th>وقت الانشاء</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reviewsData?.map((user) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user?.username}</Td>
                  <Td>{user?.email}</Td>
                  <Td>{formatDate(user?.createdAt)}</Td>
                  <Td>
                    <Button
                      backgroundColor="red.600"
                      color="white"
                      _hover={{ backgroundColor: "red.800" }}
                      onClick={() => {
                        setClickedUserId(user.id);
                        onOpen();
                      }}
                    >
                      <BiTrash size={17} />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomeAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        mutate={mutateDelete}
        loading={isDeleting}
      />
    </>
  );
};

export default DashboardUsersTable;
