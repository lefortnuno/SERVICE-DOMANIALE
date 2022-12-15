export let currentItems = [];
export let user_data = [];

export const setCurrentItems = (data) => {
  currentItems.splice(0, currentItems.length);
  currentItems.push(...data);
  console.log(user_data);
};

export const getCurrentItems = () => {
  const currentItemsList = [...currentItems];
  return currentItemsList;
};

export const setUserData = (data) => {
  currentItems.splice(0, user_data.length);
  user_data.push(...data);
  console.log(user_data);
};

export const getUserData = () => {
  const userData = [...user_data];
  return userData;
};
