import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import TableSkeleton from "../TableSkeleton";
import CustomeAlertDialog from "../../shared/AlretDialog";
import CustomeModal from "../../shared/Modal";

import { BiTrash } from "react-icons/bi";
import {
  createCategory,
  deleteCategory,
  getCategoriesList,
} from "../../services/apiCategories";

const DashboardCategoriesTable = () => {
  const [clickedProductId, setClickedProductId] = useState(null);

  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery("categories", getCategoriesList);
  console.log(data);

  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteCategory(clickedProductId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  function onCreateSubmit(data) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    mutateCreate({ body: formData });
  }

  const { isLoading: isCreating, mutate: mutateCreate } = useMutation(
    createCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });
      },
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <Button
        backgroundColor="purple.600"
        color="white"
        p="5"
        _hover={{ backgroundColor: "purple.800" }}
        onClick={onCreateModalOpen}
      >
        اضف فئة جديدة
      </Button>
      <TableContainer>
        <Table variant="simple" my={5}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((category, index) => {
              return (
                <Tr key={category}>
                  <Td>{index + 1}</Td>
                  <Td>{category}</Td>

                  <Td>
                    {/* <Button
                      backgroundColor="red.600"
                      color="white"
                      p="5"
                      _hover={{ backgroundColor: "red.800" }}
                      mr={3}
                      onClick={() => {
                        setClickedProductId(product.id);
                        onOpen();
                      }}
                    >
                      <BiTrash size={17} />
                    </Button> */}
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
      <CustomeModal
        isModalOpen={isCreateModalOpen}
        onModalOpen={onCreateModalOpen}
        onModalClose={onCreateModalClose}
        title={"Create Category"}
        okTxt="Create"
        loading={isCreating}
        mutate={mutateCreate}
        onSubmit={handleSubmit(onCreateSubmit)}
      >
        <FormControl>
          <FormLabel>Category title</FormLabel>
          <Input placeholder="Category title" {...register("title")} />
        </FormControl>
      </CustomeModal>
    </>
  );
};

export default DashboardCategoriesTable;
