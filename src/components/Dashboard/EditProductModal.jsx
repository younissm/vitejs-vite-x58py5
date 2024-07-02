import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  RadioGroup,
  Radio,
  Stack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomeModal from "../../shared/Modal";
import { EditProductSchema } from "../../utils/validationsSchemas";

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  categoriesData,
  mutateUpdate,
  isUpdating,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      category: product.category,
    },
  });

  const onSubmit = (data) => {
    // const selectedCategory = categoriesData.find(
    //   (category) => category === data.category
    // );
    // const formData = new FormData();
    // formData.append(
    //   "products",
    //   JSON.stringify({
    //     title: data.title,
    //     description: data.description,
    //     price: data.price,
    //     discount: data.discount,
    //     stock: data.stock,
    //     category: selectedCategory,
    //   })
    // );
    const formData = new FormData();
    JSON.stringify(
      formData.append("title", data.title),
      formData.append("description", data.description),
      formData.append("price", data.price),
      formData.append("discount", data.discount),
      formData.append("stock", data.stock),
      formData.append("category", data.category),
      formData.append("thumbnail", data.thumbnail[0])
    );

    mutateUpdate(formData);
  };

  return (
    <CustomeModal
      isModalOpen={isOpen}
      onModalClose={onClose}
      title="Edit Product"
      okTxt="Save"
      loading={isUpdating}
      onSubmit={handleSubmit(onSubmit)}
      errorsExist={Object.keys(errors).length > 0}
    >
      {/* Form Controls */}
      <FormControl isInvalid={errors.title}>
        <FormLabel>Product title</FormLabel>
        <Input {...register("title")} />
        <FormErrorMessage color="red">{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl my={3} isInvalid={errors.description}>
        <FormLabel>Product description</FormLabel>
        <Textarea {...register("description")} />
        <FormErrorMessage color="red">
          {errors.description?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl my={3} isInvalid={errors.category}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Product category
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <RadioGroup>
                <Stack>
                  {categoriesData?.map((category) => (
                    <Radio
                      key={category}
                      value={category}
                      {...register("category")}
                    >
                      {category}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <FormErrorMessage color="red">
                {errors.category?.message}
              </FormErrorMessage>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </FormControl>

      <FormControl my={3} isInvalid={errors.price}>
        <FormLabel>Price</FormLabel>
        <NumberInput>
          <NumberInputField {...register("price")} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage color="red">{errors.price?.message}</FormErrorMessage>
      </FormControl>

      <FormControl my={3} isInvalid={errors.discount}>
        <FormLabel>Discount</FormLabel>
        <NumberInput>
          <NumberInputField {...register("discount")} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage color="red">
          {errors.discount?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl my={3} isInvalid={errors.stock}>
        <FormLabel>Count in stock</FormLabel>
        <NumberInput>
          <NumberInputField {...register("stock")} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage color="red">{errors.stock?.message}</FormErrorMessage>
      </FormControl>

      <FormControl my={3}>
        <FormLabel>Thumbnail</FormLabel>
        <Input type="file" {...register("thumbnail")} />
        {errors.thumbnail && (
          <FormErrorMessage color="red">
            {errors.thumbnail?.message}
          </FormErrorMessage>
        )}
      </FormControl>
    </CustomeModal>
  );
};

export default EditProductModal;
