import axiosInstance from "./axiosInstance";

// Login user
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/logIn", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const signUp = async (user) => {
  try {
    const response = await axiosInstance.post("/auth/register", user);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
