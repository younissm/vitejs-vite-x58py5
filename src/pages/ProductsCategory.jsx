import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { motion } from "framer-motion";

import {
  Card,
  CardBody,
  Text,
  Button,
  Image,
  Stack,
  Heading,
  CardFooter,
  Grid,
  Box,
  Container,
  CardHeader,
  // useColorMode,
} from "@chakra-ui/react";
import { getCategoryProduct } from "../services/apiProduct";
import FilterAndSortDrawer from "../components/FilterAndSortDrawer";
import useProductFilterAndSort from "../hooks/useProductFilterAndSort";
import { formatPrice, textSlicer } from "../utils";
import { HiInformationCircle } from "react-icons/hi2";

function ProductDetailsPage() {
  const { category } = useParams();

  const { isLoading, data } = useQuery(["products", category], () =>
    getCategoryProduct(category)
  );

  const { filteredProducts, ...filterAndSortProps } = useProductFilterAndSort(
    data?.products || []
  );

  if (isLoading) return <ProductCardSkeleton />;

  return (
    <>
      <Container maxW="6xl">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          my="20px"
        >
          <Heading
            fontSize={{ base: "large", lg: "xx-large" }}
            position="relative"
            display="inline-block"
          >
            {category}
            <Box
              position="absolute"
              bottom="-10px"
              left="50%"
              transform="translateX(-50%)"
              width="100%"
              height="3px"
              backgroundColor="purple.600"
            />
          </Heading>
          <FilterAndSortDrawer {...filterAndSortProps} />
        </Stack>
      </Container>
      {filteredProducts.length === 0 ? (
        <Text textAlign={"center"} fontWeight={"bolder"} fontSize={"xx-large"}>
          لا يوجد منتجات تطابق الفرز
        </Text>
      ) : (
        <Grid
          m={"30"}
          templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
          gap={"6"}
        >
          {filteredProducts.map((product) => {
            return (
              <motion.div whileHover={{ scale: 1.05 }} key={product.id}>
                <Card
                  boxShadow="xl"
                  height="100%"
                  rounded="lg"
                  overflow="hidden"
                  p="8px"
                >
                  <CardHeader p="0" position="relative">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      mx="auto"
                      objectFit="fill"
                      // height="350px" // Set a fixed height for all images
                      width="100%"
                      aspectRatio="1/1"
                      rounded="lg"
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
                    <Stack spacing="3" alignItems={"center"}>
                      <Heading
                        size="lg"
                        fontWeight={"bold"}
                        p={3}
                        mb={2}
                        rounded={"lg"}
                        textTransform={"capitalize"}
                      >
                        {product.title}
                      </Heading>
                      <Text mb={3} textAlign="center">
                        {textSlicer(product.description, 80)}
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter
                    justifyContent="space-between"
                    alignItems="center"
                    padding="0"
                  >
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
                      backgroundColor="purple.600"
                      color="white"
                      size="sm"
                      py="20px"
                      px="10px"
                      rightIcon={<HiInformationCircle size={20} />}
                      _hover={{ backgroundColor: "purple.800" }}
                      rounded="lg"
                      aria-label="التفاصيل"
                    >
                      التفاصيل
                    </Button>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      gap="10px"
                    >
                      <Text
                        color={
                          product.discountPercentage > 0
                            ? "purple.300"
                            : "purple.600"
                        }
                        fontSize="large"
                        fontWeight="semibold"
                        textDecoration={
                          product.discountPercentage > 0
                            ? "line-through"
                            : "none"
                        }
                      >
                        {formatPrice(product.price)}
                      </Text>
                      {product.discountPercentage > 0 ? (
                        <Text
                          color="purple.600"
                          fontSize="large"
                          fontWeight="semibold"
                        >
                          {formatPrice(
                            product.price -
                              product.price * (product.discountPercentage / 100)
                          )}
                        </Text>
                      ) : null}
                    </Box>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </Grid>
      )}
    </>
  );
}

export default ProductDetailsPage;
