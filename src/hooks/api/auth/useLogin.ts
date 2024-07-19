import { useAuth } from "@context/authContext";
import { useLoading } from "@context/loadingGlobalContext";
import CoreHelper from "@helpers/coreHelper";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import authApi from "src/services/authApi";
import endpoints from "src/services/endpoints";

type LoginParams = {
  username: string;
  password: string;
};

type LoginResponse = {
  data: any;
};

const useLogin = () => {
  const { login } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  const { isLoading, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: LoginParams) =>
      authApi.post<LoginParams, LoginResponse>(endpoints.LOGIN, variables),
    onError: (e: any) => {
      stopLoading();
    },
    onSuccess: async (data) => {
      login(data.data);
      await CoreHelper.saveAcToken(data.data.accessToken);
      stopLoading();
    },
  });

  useEffect(() => {
    if (isLoading) {
      startLoading();
    }
  }, [isLoading]);

  return {
    isLoading: isLoading,
    isError,
    data,
    error,
    onLogin: mutateAsync,
  };
};

export default useLogin;
