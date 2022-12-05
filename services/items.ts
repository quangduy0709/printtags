import axios from "axios";

export const getUsers = async (page: number) => {
  return axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user`, {
    params: { page },
  });
};

export const getItemsDate = async (
  page: number,
  dateRange: {
    dateStart: string | undefined;
    dateEnd: string | undefined;
  }
) => {
  return axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/items/date`, {
    params: {
      startDate: dateRange.dateStart,
      endDate: dateRange.dateEnd,
      page: page,
    },
  });
};
