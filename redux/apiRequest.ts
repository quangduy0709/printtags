import { loginUser, registerUser } from "../services/user";
import {
  registerStart,
  registerSuccess,
  registerFailed,
  loginStart,
  loginSuccess,
  loginFailed,
} from "./authSlice";

interface IError {
  response: any;
}

export const register = async (user: any, dispatch: any, router: any) => {
  dispatch(registerStart());
  try {
    const res = await registerUser(user);
    dispatch(registerSuccess());
    router.push("/register/complete");
  } catch (err) {
    const newErr = err as IError;
    dispatch(registerFailed(newErr.response.data));
  }
};
export const login = async (user: any, dispatch: any, router: any) => {
  dispatch(loginStart());
  try {
    const res = await loginUser(user);

    dispatch(loginSuccess(res.data));
    router.push("/");
  } catch (err) {
    const newErr = err as IError;

    dispatch(loginFailed(newErr.response.data));
  }
};

export const loginQr = async (user: any, dispatch: any, router: any) => {
  dispatch(loginStart());
  try {
    const res = await loginUser(user);

    dispatch(loginSuccess(res.data));
    router.reload();
  } catch {
    dispatch(loginFailed(null));
  }
};
