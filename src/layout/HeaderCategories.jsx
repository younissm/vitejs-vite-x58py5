"use client";

import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import { getProductList } from "../services/apiProduct";

const NavLink = ({ children }) => {
  return (
    <Box
      as={RouterLink}
      to={children}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      fontSize={"large"}
      fontWeight={"bold"}
    >
      {children}
    </Box>
  );
};

export default function HeaderCategories() {
  const { data } = useQuery("products", getProductList);
  return (
    <>
      <Box bg={useColorModeValue("purple.100", "purple.900")} py={4}>
        <HStack spacing={8} alignItems={"center"} justifyContent={"center"}>
          <HStack as={"nav"} spacing={4}>
            {data?.data?.map((product) => {
              return (
                <NavLink key={product.id}>
                  {product.attributes.category.data.map(
                    (item) => item.attributes.title
                  )}
                </NavLink>
              );
            })}
          </HStack>
        </HStack>
      </Box>
    </>
  );
}
