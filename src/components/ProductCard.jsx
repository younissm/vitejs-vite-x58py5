import {
  Card,
  CardBody,
  Text,
  Button,
  Image,
  Heading,
  CardFooter,
  CardHeader,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice, textSlicer } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../app/features/cartSlice";
import { addItem as addItemToWishlist } from "../app/features/wishlistSlice";
import { getProduct } from "../services/apiProduct";

import { useQuery } from "react-query";
import {
  HiEye,
  HiOutlineArrowsRightLeft,
  HiOutlineExclamationTriangle,
  HiOutlineHeart,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { addItemToCompare } from "../app/features/compareSlice";

const ProductCard = (product) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const compare = useSelector((state) => state.compare);

  const toast = useToast();

  const { pathname } = useLocation();

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
        title: " المنتج موجود بالفعل في قائمة الرغبات ",
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

  const { data } = useQuery(["product", product.id], () =>
    getProduct(product.id)
  );

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card boxShadow="xl" height="100%" rounded="lg" p="10px">
        <CardHeader p="0" position="relative">
          {product.discountPercentage > 0 ? (
            <Text
              color="white"
              position="absolute"
              top="0"
              right="0"
              p="5px"
              bg="purple.600"
              roundedBottomLeft="lg"
              roundedTopRight="lg"
            >
              {`-${product.discountPercentage}%`}
            </Text>
          ) : null}
          <Box
            display="flex"
            flexDirection="column"
            gap="4px"
            color="white"
            position="absolute"
            top="0"
            left="0"
            p="5px"
            bg="purple.600"
            roundedBottomRight="lg"
            roundedTopLeft="lg"
          >
            <IconButton
              color="purple.600"
              _hover={{
                color: "white",
                bg: "purple.800",
              }}
              bg="white"
              size="sm"
              rounded="lg"
              icon={<HiOutlineShoppingBag size="20" />}
              onClick={handleAddToCart}
            />
            <IconButton
              color="purple.600"
              _hover={{
                color: "white",
                bg: "purple.800",
              }}
              bg="white"
              size="sm"
              rounded="lg"
              icon={<HiOutlineHeart size="20" />}
              onClick={handleAddToWishlist}
            />
            {pathname !== "/compare" && (
              <IconButton
                color="purple.600"
                _hover={{
                  color: "white",
                  bg: "purple.800",
                }}
                bg="white"
                size="sm"
                rounded="lg"
                icon={<HiOutlineArrowsRightLeft size="20" />}
                onClick={handleAddToCompare}
              />
            )}
          </Box>
          <Image
            src={product.thumbnail}
            alt={product.title}
            mx="auto"
            objectFit="fill"
            // height="350px" // Set a fixed height for all images
            width="100%"
            rounded="lg"
            aspectRatio="1/1"
          />
        </CardHeader>
        <CardBody
          p={0}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            fontSize="larger"
            fontWeight="bold"
            p={3}
            mb={2}
            rounded="lg"
            textTransform="capitalize"
            wordBreak="break-word"
            // noOfLines="1"
          >
            {textSlicer(product.title, 20)}
          </Heading>

          <Text mb={3} textAlign="center">
            {textSlicer(product.description, 30)}
          </Text>
        </CardBody>
        <CardFooter
          justifyContent="space-between"
          alignItems="center"
          padding="0 !important"
        >
          <Button
            as={Link}
            to={`/products/${product.id}`}
            backgroundColor="purple.600"
            color="white"
            size="sm"
            py="20px"
            px="10px"
            rightIcon={<HiEye size={20} />}
            _hover={{ backgroundColor: "purple.800" }}
            rounded="lg"
            aria-label="التفاصيل"
          >
            التفاصيل
          </Button>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            gap="5px"
          >
            {product.discountPercentage > 0 ? (
              <Text color="purple.600" fontSize="larger" fontWeight="semibold">
                {formatPrice(
                  product.price -
                    product.price * (product.discountPercentage / 100)
                )}
              </Text>
            ) : null}
            <Text
              color={
                product.discountPercentage > 0 ? "purple.300" : "purple.600"
              }
              fontSize="large"
              fontWeight="semibold"
              textDecoration={
                product.discountPercentage > 0 ? "line-through" : "none"
              }
            >
              {formatPrice(product.price)}
            </Text>
          </Box>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
