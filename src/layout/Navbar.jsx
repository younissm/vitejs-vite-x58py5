import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import {
  HiArrowLeftOnRectangle,
  HiOutlineArrowsRightLeft,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineUserPlus,
  HiShoppingCart,
} from "react-icons/hi2";
import { Link as RouterLink } from "react-router-dom";
import CookieServices from "../services/CookieServices";
import { useSelector } from "react-redux";
import SearchBar from "../components/Search";
import { useQuery } from "react-query";
import { getMyUser } from "../services/apiUsers";
import { DarkmodeToggle } from "../components/DarkmodeToggle";

export default function Nav() {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const compare = useSelector((state) => state.compare);

  const token = CookieServices.get("jwt");

  const logoutHandler = () => {
    CookieServices.remove("jwt");
    document.location.reload();
  };

  const { data } = useQuery("users", getMyUser);

  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [prevScrollPos]);

  return (
    <Box
      bg={"purple.600"}
      px={4}
      boxShadow={"lg"}
      width={"100%"}
      zIndex={10}
      // position={"fixed"}
      // transition={"top 0.3s"}
      // top={visible ? "0" : "-70px"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box as={RouterLink} to="/" aria-label="logo">
          <HiShoppingCart fontSize={"xxx-large"} color={"white"} />
        </Box>

        <Box
          display={{ base: "none", md: "block" }}
          border="1px solid white"
          rounded="lg"
        >
          <SearchBar />
        </Box>

        <Flex alignItems="center" justifyContent="space-between" gap="15px">
          <Flex alignItems="center">
            <DarkmodeToggle />
            <Tooltip label="عربة التسوق" fontSize="md">
              <Box className="cart" position="relative">
                <Button
                  as={RouterLink}
                  to={"/cart"}
                  bg={"none"}
                  _hover={{ bg: "none" }}
                  p="0"
                  aria-label="عربة التسوق"
                >
                  <Text
                    as={"span"}
                    fontSize={"x-large"}
                    color="white"
                    _hover={{ color: "purple.800", transition: "color 0.2s" }}
                  >
                    <HiOutlineShoppingBag size={24} />
                  </Text>
                  {cart.cart.length > 0 && (
                    <Box
                      position="absolute"
                      top="0"
                      right="0"
                      transform="translate(-50%, -50%)"
                      width="20px"
                      height="20px"
                      rounded="lg"
                      backgroundColor="red.500"
                      color="white"
                      textAlign="center"
                    >
                      {cart.cart.length}
                    </Box>
                  )}
                </Button>
              </Box>
            </Tooltip>

            <Tooltip label="قائمة الرغبات" fontSize="md">
              <Box className="wishlist" position="relative">
                <Button
                  as={RouterLink}
                  to={"/wishlist"}
                  bg={"none"}
                  _hover={{ bg: "none" }}
                  p="0"
                  aria-label="قائمة الرغبات"
                >
                  <Text
                    as={"span"}
                    color={"white"}
                    _hover={{ color: "purple.800", transition: "color 0.2s" }}
                  >
                    <HiOutlineHeart size={24} />
                  </Text>
                  {wishlist.wishlist.length > 0 && (
                    <Box
                      position="absolute"
                      top="0"
                      right="0"
                      transform="translate(-50%, -50%)"
                      width="20px"
                      height="20px"
                      rounded="lg"
                      backgroundColor="red.500"
                      color="white"
                      textAlign="center"
                    >
                      {wishlist.wishlist.length}
                    </Box>
                  )}
                </Button>
              </Box>
            </Tooltip>
            <Tooltip label=" المقارنة" fontSize="md">
              <Box className="compare" position="relative">
                <Button
                  as={RouterLink}
                  to={"/compare"}
                  bg={"none"}
                  _hover={{ bg: "none" }}
                  p="0"
                  aria-label="المقارنة"
                >
                  <Text
                    as={"span"}
                    color={"white"}
                    _hover={{ color: "purple.800", transition: "color 0.2s" }}
                  >
                    <HiOutlineArrowsRightLeft size={24} />
                  </Text>
                  {compare.compare.length > 0 && (
                    <Box
                      position="absolute"
                      top="0"
                      right="0"
                      transform="translate(-50%, -50%)"
                      width="20px"
                      height="20px"
                      rounded="lg"
                      backgroundColor="red.500"
                      color="white"
                      textAlign="center"
                    >
                      {compare.compare.length}
                    </Box>
                  )}
                </Button>
              </Box>
            </Tooltip>
          </Flex>

          <Flex>
            {token ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <IconButton
                    bg="white"
                    color="purple.800"
                    size="md"
                    rounded="lg"
                    _hover={{
                      bg: "purple.800",
                      color: "white",
                    }}
                    icon={<HiOutlineUser size={24} />}
                    aria-label="المستخدم"
                  />
                </MenuButton>
                <MenuList
                  alignItems={"center"}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <br />
                  <Center>
                    <Avatar size={{ base: "md", md: "xl" }} alt="avatar" />
                  </Center>
                  <br />
                  <Center>
                    <Text>{data?.username}</Text>
                  </Center>
                  <br />
                  <MenuDivider />
                  {data?.role?.type === "admin" && (
                    <MenuItem as={RouterLink} to="/dashboard">
                      لوحة التحكم
                    </MenuItem>
                  )}
                  <MenuItem as={RouterLink} to="/userProfile">
                    حساب المستخدم
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>تسجيل الخروج</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex gap="4px" alignItems="center">
                <Tooltip label=" الاشتراك" fontSize="md">
                  <IconButton
                    bg="white"
                    color="purple.800"
                    size="md"
                    rounded="lg"
                    _hover={{
                      bg: "purple.800",
                      color: "white",
                    }}
                    icon={<HiOutlineUserPlus size={24} />}
                    as={RouterLink}
                    to={"/signup"}
                    aria-label="الاشتراك"
                  />
                </Tooltip>
                <Tooltip label=" تسجيل الدخول" fontSize="md">
                  <IconButton
                    bg="white"
                    color="purple.800"
                    size="md"
                    rounded="lg"
                    _hover={{
                      bg: "purple.800",
                      color: "white",
                    }}
                    icon={<HiArrowLeftOnRectangle size={24} />}
                    as={RouterLink}
                    to={"/login"}
                    aria-label="تسجيل الدخول"
                  />
                </Tooltip>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
