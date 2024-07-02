import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { useDispatch } from "react-redux";
import { addItem } from "../app/features/cartSlice";
import { addItem as addItemToWishlist } from "../app/features/wishlistSlice";
import {
  HiOutlineArrowsRightLeft,
  HiOutlineExclamationTriangle,
  HiOutlineHeart,
  HiOutlineShoppingBag,
} from "react-icons/hi2";

import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Reviews from "../components/Reviews";
import { useSelector } from "react-redux";
import { BsStarFill } from "react-icons/bs";
import { getProduct } from "../services/apiProduct";
import { formatPrice } from "../utils";
import { addItemToCompare } from "../app/features/compareSlice";

function ProductDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const compare = useSelector((state) => state.compare);

  const toast = useToast();

  const handleAddToCart = () => {
    const existingProduct = cart.cart.find((item) => item.id === data.id);
    !existingProduct &&
      (dispatch(addItem(data)),
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

  const handleAddToWishlist = () => {
    const existingProduct = wishlist.wishlist.find(
      (item) => item.id === data.id
    );
    !existingProduct &&
      (dispatch(addItemToWishlist(data)),
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

  const handleAddToCompare = () => {
    const existingProduct = compare.compare.find((item) => item.id === data.id);

    if (!existingProduct) {
      if (compare.compare.length < 3) {
        dispatch(addItemToCompare(data));
        toast({
          title: " المنتج تمت اضافته الى المقارنات بنجاح",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          icon: <HiOutlineArrowsRightLeft size={20} />,
        });
      } else {
        toast({
          title: "لا يمكن اضافة المنتج، يمكنك المقارنة بين 3 منتجات فقط",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          icon: <HiOutlineExclamationTriangle size={20} />,
        });
      }
    } else {
      toast({
        title: " المنتج موجود بالفعل في المقارنات ",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineExclamationTriangle size={20} />,
      });
    }
  };

  const { isLoading, data } = useQuery(["product", id], () => getProduct(id));

  // const averageRating = useSelector((state) => state.averageRating);

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <Box m={30}>
      <Box>
        <Heading
          fontSize={{ base: "large", lg: "xx-large" }}
          mb="20px"
          position="relative"
          display="inline-block"
        >
          {data?.title}
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
        <Box
          borderWidth="1px"
          borderRadius="md"
          borderColor={"purple.600"}
          rounded="lg"
          boxShadow="xl"
          mb="4"
        >
          <HStack
            spacing="4"
            justifyContent={"space-between"}
            gap={4}
            flexDirection={{ base: "column", lg: "row" }}
          >
            <Image
              src={data?.thumbnail}
              alt={data.title}
              width="100%"
              objectFit={"fill"}
              rounded="lg"
              roundedBottom={{ base: "none", lg: "lg" }}
              roundedLeft={{ base: "lg", lg: "none" }}
              flexBasis="50%"
            />
            <VStack
              align="start"
              justify="center"
              spacing="4"
              flexBasis="50%"
              p="20px"
            >
              <Text fontSize={{ base: "md", md: "lg" }} mt="2" color="gray.400">
                {data.description}
              </Text>

              {data.discountPercentage > 0 ? (
                <Text fontSize="lg" fontWeight="semibold">
                  تخفيض : {`${Math.ceil(data.discountPercentage)} %`}
                </Text>
              ) : null}

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap="10px"
              >
                <Text
                  fontSize="large"
                  fontWeight="semibold"
                  textDecoration={
                    data.discountPercentage ? "line-through" : "none"
                  }
                >
                  {formatPrice(data.price)}
                </Text>
                <Text fontSize="large" fontWeight="semibold">
                  {formatPrice(
                    data.price - data.price * (data.discountPercentage / 100)
                  )}
                </Text>
              </Box>
              <Text fontSize="md">عدد القطع المتوفرة :{data.stock}</Text>
              {/* <Text>
                التقييم :{" "}
                {averageRating === 0
                  ? "لايوجد مراجعات , كن اول المراجعين"
                  : averageRating}
              </Text> */}
              {/* <Text as="span" display="flex" gap="1">
                {[...Array(Math.round(averageRating))].map((_, index) => (
                  <BsStarFill color="gold" key={index} />
                ))}
              </Text> */}
              <HStack spacing="2" flexDirection="row">
                <IconButton
                  backgroundColor="purple.600"
                  color="white"
                  size="lg"
                  _hover={{ backgroundColor: "purple.800" }}
                  onClick={handleAddToCart}
                  aria-label="اضافة الى العربة"
                  icon={<HiOutlineShoppingBag />}
                />
                <IconButton
                  backgroundColor="purple.600"
                  color="white"
                  size="lg"
                  _hover={{ backgroundColor: "purple.800" }}
                  onClick={handleAddToWishlist}
                  aria-label="اضافة الى المفضلة"
                  icon={<HiOutlineHeart />}
                />
                <IconButton
                  backgroundColor="purple.600"
                  color="white"
                  size="lg"
                  _hover={{ backgroundColor: "purple.800" }}
                  icon={<HiOutlineArrowsRightLeft size="20" />}
                  onClick={handleAddToCompare}
                />
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Box>

      <Reviews productId={id} />
    </Box>
  );
}

export default ProductDetailsPage;
