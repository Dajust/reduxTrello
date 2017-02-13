//======== UTILS  ===========
export const removeItemFromObject = (item, obj) => {
  const newObj = { ...obj };
  delete newObj[item];
  return newObj;
};

export const removeItemFromArray = (index, array) =>
  array.filter((val, i) => i !== index);

export const swapCardIndex = (cardArray, {hoverID, hoverIndex, dragID, dragIndex}) => {
  const newArray = [...cardArray];
  newArray[dragIndex] = hoverID;
  newArray[hoverIndex] = dragID;
  return newArray;
};

export const addItemToArray = (item, index, array) => {
  const newArray = [...array];
  newArray[index] = item;
  return newArray;
};
