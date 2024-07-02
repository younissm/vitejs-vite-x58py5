import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Container, Flex } from "@chakra-ui/react";
import Breadcrumbs from "../components/Breadcrumbs";
import BackButton from "../shared/BackButton";

const AppLayout = () => {
  const { pathname } = useLocation();

  return (
    <Flex flexDirection="column" minH="100vh">
      <Navbar />
      <Box flex="1">
        {pathname !== "/" && (
          <Container
            maxW="6xl"
            mt="10px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Breadcrumbs pathname={pathname} />
            <BackButton />
          </Container>
        )}
        {/* {pathname !== "/" && <Breadcrumbs pathname={pathname} />} */}
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default AppLayout;
