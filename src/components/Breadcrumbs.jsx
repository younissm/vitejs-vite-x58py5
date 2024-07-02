import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ pathname }) => {
  const segments = pathname.split("/").filter((segment) => segment);

  return (
    <Breadcrumb
      separator={<HiChevronLeft />}
      spacing="1px"
      color="purple.600"
      fontSize="large"
    >
      <BreadcrumbItem>
        <BreadcrumbLink
          as={Link}
          to="/"
          _hover={{ textDecoration: "none", color: "purple.300" }}
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {segments.map((segment, index) => (
        <BreadcrumbItem key={index}>
          {index === segments.length - 1 ? (
            <Text color="purple.300">
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Text>
          ) : segment.toLowerCase() === "categories" ||
            segment.toLowerCase() === "offers" ? (
            <Text color="purple.600">
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Text>
          ) : (
            <BreadcrumbLink
              as={Link}
              to={`/${segment}`}
              _hover={{ textDecoration: "none", color: "purple.300" }}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
