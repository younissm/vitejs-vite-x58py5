import { useState } from "react";
import { Box, Container, Grid, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import FilterAndSortDrawer from "../components/FilterAndSortDrawer";
import { useQuery } from "react-query";
import { getProductList } from "../services/apiProduct";
import Pagination from "../components/Pagination";
import useProductFilterAndSort from "../hooks/useProductFilterAndSort";

const Products = () => {
  const { isLoading, data } = useQuery("products", getProductList);

  const { filteredProducts, ...filterAndSortProps } = useProductFilterAndSort(
    data?.products || []
  );

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <Grid
        m={"30"}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={"6"}
      >
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </Grid>
    );
  }

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <Box mt="10px">
        <Container maxW="6xl">
          <FilterAndSortDrawer data={data} {...filterAndSortProps} />
        </Container>
      </Box>
      {filteredProducts.length === 0 ? (
        <Text textAlign={"center"} fontWeight={"bolder"} fontSize={"xx-large"}>
          لا يوجد منتجات تطابق الفرز
        </Text>
      ) : (
        <>
          <Grid
            m={"30"}
            templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
            gap={"6"}
          >
            {filteredProducts.slice(startIndex, endIndex).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Grid>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default Products;
