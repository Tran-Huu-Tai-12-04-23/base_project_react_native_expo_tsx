import { useAuth } from "@context/authContext";
import Helper from "@helper/helpers";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { IUser } from "src/dto";
import { endpoints } from "src/services/endpoints";
import rootApi from "src/services/rootApi";

type LoginParams = {
  username: string;
  password: string;
};
type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    enumData: any;
  };
};

const useLogin = () => {
  const { login } = useAuth();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: LoginParams) => {
      return rootApi.post<LoginParams, LoginResponse>(
        endpoints.LOGIN,
        variables
      );
    },
    onError: (e: any) => {
      Toast.show({
        type: "error",
        text2: e?.response?.data?.message || "Đã có lỗi xảy ra",
      });
    },
    onSuccess: async (data) => {
      await Helper.saveToken(data.data.accessToken);
      await login({ user: data.data.user, enumData: data.data.enumData });
    },
  });
  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onLogin: mutateAsync,
  };
};

export default useLogin;
