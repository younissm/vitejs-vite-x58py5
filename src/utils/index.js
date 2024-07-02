export const addItemToShoppingCart = (
  cartItem = {},
  shoppingCartItems = []
) => {
  const existsItem = shoppingCartItems.find((item) => item.id === cartItem.id);

  if (existsItem) {
    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};

export const addItemToWishlist = (favItem = {}, wishlistItems = []) => {
  const existsItem = wishlistItems.find((item) => item.id === favItem.id);

  if (existsItem) {
    return wishlistItems.map((item) =>
      item.id === favItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...wishlistItems, { ...favItem, quantity: 1 }];
};

export const formatPrice = (price) => {
  const numericPrice = Number(price);

  const formatedPrice = numericPrice.toLocaleString("ar-EG", {
    style: "currency",
    currency: "EGP",
  });
  return formatedPrice;
};

export const textSlicer = (txt, max = 50) => {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
};
