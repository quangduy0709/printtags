import axios from "axios";

export const getQr = async (page: number) => {
  return axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/qr`, {
    params: { page },
  });
};

export const getMyQr = async (page: number, idUser: string) => {
  return axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/myqr`, {
    params: { page, idUser },
  });
};

export const updateQr = async (qr: {}) => {
  await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/update-qr`, {
    qr,
  });
};
