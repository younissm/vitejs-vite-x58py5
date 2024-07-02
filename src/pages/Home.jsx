import { Box } from "@chakra-ui/react";
import Categories from "../components/Categories";
import SearchBar from "../components/Search";
import Hero from "../components/Hero";
import DiscountsCarousel from "../components/HomeDiscountsSlider";
import ProductCarousel from "../components/HomeProductsSlider";
import OffersSlider from "../components/OffersSlider";
import Benefits from "../components/Benefits";

const Home = () => {
  return (
    <>
      <Box display={{ base: "block", md: "none" }} bg="purple.600">
        <SearchBar />
      </Box>
      <Hero />
      <OffersSlider />
      <Box mx="10px">
        <Benefits />
        <Categories />
        <DiscountsCarousel />
        <ProductCarousel />
      </Box>
    </>
  );
};

export default Home;
