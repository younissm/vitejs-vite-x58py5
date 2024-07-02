import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineExclamationTriangle,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineXMark,
} from "react-icons/hi2";
import {
  clearCompare,
  deleteItemFromCompare,
} from "../app/features/compareSlice";
import { addItem } from "../app/features/cartSlice";
import { addItem as addItemToWishlist } from "../app/features/wishlistSlice";

export default function Compare() {
  const compare = useSelector((state) => state.compare);
  const dispatch = useDispatch();

  const cardBg = { light: "#ffffff", dark: "#1a202c" };

  const { colorMode } = useColorMode();
  const attributes = [
    { label: "اسم المنتج", key: "title" },
    { label: "الوصف", key: "description" },
    { label: "الفئة", key: "category" },
    { label: "السعر", key: "price" },
    { label: "نسبة الخصم", key: "discountPercentage" },
    { label: "التقييم", key: "rating" },
    { label: " عدد القطع المتبقية", key: "stock" },
  ];

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const toast = useToast();

  const handleAddToCart = (product) => {
    const existingProduct = cart.cart.find((item) => item.id === product.id);
    !existingProduct &&
      (dispatch(addItem(product)),
      toast({
        title: "المنتج تمت اضافته الى عربة التسوق بنجاح",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineShoppingBag size={20} />,
      }));

    existingProduct &&
      toast({
        title: " المنتج موجود بالفعل في عربة التسوق",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineExclamationTriangle size={20} />,
      });
  };

  const handleAddToWishlist = (product) => {
    const existingProduct = wishlist.wishlist.find(
      (item) => item.id === product.id
    );
    !existingProduct &&
      (dispatch(addItemToWishlist(product)),
      toast({
        title: " المنتج تمت اضافته الى قائمة الرغبات بنجاح",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineHeart size={20} />,
      }));

    existingProduct &&
      toast({
        title: "المنتج موجود بالفعل في قائمة الرغبات",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineExclamationTriangle size={20} />,
      });
  };

  return (
    <Container maxW="6xl" my="30px">
      {compare.compare.length > 0 ? (
        <>
          <Grid
            templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
            rounded="lg"
            overflow="hidden"
            bg={cardBg[colorMode]}
            shadow="lg"
            position={{ base: "static", md: "sticky" }}
            top="0"
            p="10px"
            gap="5px"
          >
            {compare.compare.map((product) => (
              <Box
                key={product.id}
                p="8px"
                border="2px solid"
                borderColor="purple.600"
                rounded="lg"
              >
                <Box
                  onClick={() => dispatch(deleteItemFromCompare(product.id))}
                  display="inline-block"
                  cursor="pointer"
                  mb="5px"
                  bg="purple.600"
                  color="white"
                  size="md"
                  rounded="lg"
                  _hover={{
                    bg: "purple.800",
                    color: "white",
                  }}
                >
                  <HiOutlineXMark size={24} />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    rounded="lg"
                    boxSize="90px"
                    objectFit="cover"
                    mr={4}
                  />
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="purple.600"
                    flex="1"
                  >
                    {product.title}
                  </Text>
                </Box>
                <ButtonGroup variant="outline" spacing={1} width="100%">
                  <IconButton
                    backgroundColor="purple.600"
                    color="white"
                    size="sm"
                    _hover={{ backgroundColor: "purple.800" }}
                    onClick={() => handleAddToCart(product)}
                    aria-label="اضافة الى العربة"
                    icon={<HiOutlineShoppingBag size={22} />}
                    flexBasis="50%"
                    border="none"
                  />
                  <IconButton
                    backgroundColor="purple.600"
                    color="white"
                    size="sm"
                    _hover={{ backgroundColor: "purple.800" }}
                    onClick={() => handleAddToWishlist(product)}
                    aria-label="اضافة الى المفضلة"
                    icon={<HiOutlineHeart size={22} />}
                    flexBasis="50%"
                    border="none"
                  />
                </ButtonGroup>
              </Box>
            ))}
          </Grid>
          <Table
            variant="simple"
            colorScheme="purple"
            my={5}
            fontWeight="bold"
            color="white"
          >
            <Tbody>
              {attributes.map((attribute, rowIndex) => (
                <>
                  <Text mb="6px" mt="20px" fontSize="large" color="purple.600">
                    {attribute.label}
                  </Text>
                  <Tr key={rowIndex} bg="purple.600">
                    <Grid
                      templateColumns={{
                        sm: "repeat(1,1fr)",
                        md: "repeat(3,1fr)",
                      }}
                    >
                      {compare.compare.map((product) => (
                        <Td key={product.id} textAlign="center">
                          {product[attribute.key]}
                        </Td>
                      ))}
                    </Grid>
                  </Tr>
                </>
              ))}
            </Tbody>
          </Table>
          <Button
            bg={"red.600"}
            color="white"
            size="md"
            p="10px"
            _hover={{ backgroundColor: "red.800" }}
            onClick={() => dispatch(clearCompare())}
            rightIcon={<HiOutlineXMark size={24} />}
            aria-label="مسح المقارنة"
          >
            مسح المقارنة
          </Button>
        </>
      ) : (
        <Text fontWeight={"bold"} fontSize={"xx-large"} textAlign={"center"}>
          اضف منتجات الى المقارنة
        </Text>
      )}
    </Container>
  );
}
