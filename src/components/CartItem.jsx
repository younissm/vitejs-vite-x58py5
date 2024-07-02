import { Box, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  decressItem,
  deleteItem,
  incressItem,
} from "../app/features/cartSlice";
import { HiTrash } from "react-icons/hi2";
import { motion } from "framer-motion";
import { formatPrice } from "../utils";
import { HiMinus, HiPlus } from "react-icons/hi";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Flex
        key={item.id}
        alignItems="center"
        justify={"space-between"}
        borderWidth="1px"
        borderRadius="md"
        borderColor={"purple.600"}
        p="2"
        mb="2"
        gap={2}
        boxShadow="md"
        flexDirection={{ base: "column", md: "row" }}
        w="100%"
      >
        <Flex
          gap="20px"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "start", md: "center" }}
          w="100%"
        >
          <Box w="100%">
            <Image
              src={item?.thumbnail}
              alt={item.title}
              boxSize="200px"
              objectFit="cover"
              rounded="md"
              w="100%"
            />
          </Box>
          <Box w="100%">
            <Heading fontSize="larger" mb="10px">
              {item.title}
            </Heading>
            {item.discountPercentage > 0 && (
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold"
                mb="2"
              >
                {formatPrice(
                  item.price - item.price * (item.discountPercentage / 100)
                )}
              </Text>
            )}
            <Text
              fontSize={{ base: "md", md: "lg" }}
              textDecoration={
                item.discountPercentage > 0 ? "line-through" : "none"
              }
              color={item.discountPercentage > 0 ? "gray.500" : "white"}
              fontWeight={item.discountPercentage > 0 ? "normal" : "bold"}
            >
              {formatPrice(item.price)}
            </Text>
            <Flex align={"center"} justify={"flex-start"} gap={4} mt={4}>
              <IconButton
                backgroundColor="purple.600"
                color="white"
                p="5"
                _hover={{ backgroundColor: "purple.800" }}
                onClick={() => dispatch(incressItem(item.id))}
                icon={<HiPlus />}
              />
              <Text color="purple.600" fontWeight="bold">
                {item.quantity}
              </Text>
              <IconButton
                backgroundColor="purple.600"
                color="white"
                p="5"
                _hover={{ backgroundColor: "purple.800" }}
                onClick={() => dispatch(decressItem(item.id))}
                icon={<HiMinus />}
              />
            </Flex>
          </Box>
        </Flex>
        <Flex
          flexDirection={{ base: "row", md: "column" }}
          gap="10px"
          justifyContent="space-between"
          alignItems="flex-end"
          w="100%"
        >
          <Box>
            <Text fontWeight="bold">
              <Text> السعر الكلي</Text>
              {item.discountPercentage > 0
                ? formatPrice(
                    (item.price -
                      item.price * (item.discountPercentage / 100)) *
                      item.quantity
                  )
                : formatPrice(item.price * item.quantity)}
            </Text>
          </Box>
          <IconButton
            backgroundColor="red.600"
            color="white"
            maxW={"120px"}
            _hover={{ backgroundColor: "red.800" }}
            onClick={() => dispatch(deleteItem(item.id))}
            icon={<HiTrash />}
          />
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default CartItem;
