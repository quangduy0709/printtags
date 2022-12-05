import axios from "axios";
import Cookies from "js-cookie";

interface user {
  name: string;
  email: string;
  password: string | null;
}
export const registerUser = async (user: user) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user/register`,
    {
      userName: user.name,
      email: user.email,
      password: user.password,
    }
  );
};

export const loginUser = async (user: user) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user/login`,
    {
      email: user.email,
      password: user.password,
    }
  );
};

export const logoutUser = async () => {
  await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user/logout`);
};

export const verifyUser = async () => {
  const tokens = Cookies.get("token");
  if (tokens) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user/verify?token=${tokens}`
    );
    return res;
  } else {
    return;
  }
};

export const createInfo = async (user: Users) => {
  await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/contact`, {
    user,
  });
};

export const getInfo = async (_idQr: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/contact`,
    { params: { _idQr } }
  );
};

export const getUser = async (idUser: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/account`,
    { params: { idUser } }
  );
};

export const updateInfo = async (user: Users) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/account`,
    {
      user,
    }
  );
};
export const updateAdmin = async (user: Role) => {
  return await axios.put(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user`, {
    user,
  });
};

export const resetPass = async (email: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user/forgot-password`,
    {
      email: email,
    }
  );
};
export const changePassword = async (email: string, password: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user/change-password`,
    {
      email: email,
      password: password,
    }
  );
};
