import axios from "axios";

export const useAuth = () => {
  async function logIn(userData) {
    try {
      const data = await axios.post(API_URL + "/user/login", userData, {
        headers: {
          "Content-Type": "",
        },
      });
      return data.data.user;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  async function signIn({ name, login, password }) {
    try {
      const data = await axios.post(
        API_URL + "/user",
        { login, name, password },
        {
          headers: {
            "Content-Type": "",
          },
        }
      );
      return data.data.user;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  return {
    logIn,
    signIn,
  };
};
