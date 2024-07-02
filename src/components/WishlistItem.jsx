import { Box, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../app/features/wishlistSlice";
import { HiEye, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice } from "../utils";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Flex
        key={item.id}
        alignItems="center"
        borderWidth="1px"
        borderRadius="md"
        borderColor={"purple.600"}
        p="2"
        mb="2"
        justify={"space-between"}
        boxShadow="md"
        flexDirection={{ base: "column", md: "row" }}
        gap="20px"
      >
        <Flex
          gap="20px"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "start", md: "center" }}
          w="100%"
        >
          <Box w={{ base: "100%", md: "25%" }} h="100%">
            <Image
              src={item.thumbnail}
              alt={item.title}
              objectFit="cover"
              rounded="md"
              w="100%"
              h="100%"
            />
          </Box>
          <Box flexBasis="75%">
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              mb="2"
            >
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

            <Text fontSize={{ base: "md", md: "lg" }} mt="2" color="gray.400">
              {item.description}
            </Text>
          </Box>
        </Flex>
        <Flex gap={1} my="20px">
          <IconButton
            backgroundColor={"purple.600"}
            color="white"
            _hover={{ backgroundColor: "purple.800" }}
            as={Link}
            to={`/products/${item.id}`}
            icon={<HiEye />}
          />

          <IconButton
            backgroundColor={"red.600"}
            color="white"
            _hover={{ backgroundColor: "red.800" }}
            onClick={() => dispatch(deleteItem(item.id))}
            icon={<HiTrash />}
          />
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default WishlistItem;
