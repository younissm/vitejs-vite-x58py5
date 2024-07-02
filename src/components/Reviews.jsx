import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Rating } from "react-simple-star-rating";
import { createReview, getReviewsList } from "../services/apiReviews";
import { getMyUser } from "../services/apiUsers";
import { useForm } from "react-hook-form";
import { BsStarFill } from "react-icons/bs";
import { setAverageRating } from "../app/features/averageRatingSlice";
import { useDispatch } from "react-redux";
import CookieServices from "../services/CookieServices";

const Reviews = ({ productId }) => {
  const [rating, setRating] = useState(0);

  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();

  const { data: reviewsData } = useQuery("reviews", getReviewsList);

  const { isLoading: isCreating, mutate: mutateCreate } = useMutation(
    createReview,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviews"],
        });
      },
    }
  );

  const { data: userData } = useQuery("users", getMyUser);

  const token = CookieServices.get("jwt");

  const handleRating = (newRating) => {
    setRating(newRating); // Update rating state when the user clicks on a star
  };

  const onSubmit = (submitData) => {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        username: userData?.username,
        rating: rating,
        review: submitData.review,
        user: userData?.id,
        product: productId,
      })
    );
    mutateCreate({ body: formData });
  };

  // Check if the user has already made a review for this product
  const hasReviewed = reviewsData?.data?.some(
    (review) =>
      review?.attributes?.product?.data?.id === Number(productId) &&
      review?.attributes?.username === userData?.username
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate average rating
    const productReviews = reviewsData?.data?.filter(
      (review) => review?.attributes?.product?.data?.id === Number(productId)
    );

    if (!productReviews || productReviews.length === 0) {
      dispatch(setAverageRating(0));
      return;
    }

    const totalRating = productReviews.reduce(
      (accumulator, review) => accumulator + review.attributes.rating,
      0
    );

    const averageRating = totalRating / productReviews.length;
    dispatch(setAverageRating(averageRating));
  }, [dispatch, productId, reviewsData]);
  return (
    <>
      <Heading
        fontSize={{ base: "large", lg: "xx-large" }}
        mb="20px"
        position="relative"
        display="inline-block"
      >
        المراجعات
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
      {token && !hasReviewed && (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} mb="40px">
          <VStack>
            <FormControl>
              <FormLabel>مراجعة المنتج</FormLabel>
              <Textarea
                placeholder="مراجعة المنتج"
                {...register("review", {
                  required: "This field is required",
                })}
                borderColor="purple.600"
                _hover={{ borderColor: "purple.800" }}
              />
            </FormControl>
            <Box>
              <Rating
                onClick={handleRating}
                ratingValue={rating}
                rtl
                transition
                iconsCount={5}
                titleSeparator="من"
                SVGstyle={{ display: "inline-block" }}
              />
            </Box>
            <Button
              type="submit"
              backgroundColor="purple.600"
              color="white"
              size="large"
              p="5"
              _hover={{ backgroundColor: "purple.800" }}
              isLoading={isCreating}
            >
              مراجعة
            </Button>
          </VStack>
        </Box>
      )}
      <Flex flexDirection="column" gap="3">
        {reviewsData?.data
          ?.filter(
            (review) =>
              review?.attributes?.product?.data?.id === Number(productId)
          )
          .map((review) => (
            <Box
              key={review.id}
              borderWidth="1px"
              borderRadius="md"
              borderColor={"purple.600"}
              boxShadow="xl"
              p="4"
            >
              <Heading as="h3" mb="4px">
                {review?.attributes?.username}
              </Heading>
              <Text display="inline-block" mb="4px">
                التقييم:{review?.attributes?.rating}
                <Text as="span" display="flex" gap="1">
                  {[...Array(review?.attributes?.rating)].map((_, index) => (
                    <BsStarFill color="gold" key={index} />
                  ))}
                </Text>
              </Text>
              <Text>{review?.attributes?.review}</Text>
            </Box>
          ))}
      </Flex>
    </>
  );
};

export default Reviews;
