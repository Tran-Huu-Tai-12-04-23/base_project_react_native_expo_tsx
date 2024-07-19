import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import endpoints from "../services/endpoints";
import uploadApi from "../services/uploadApi";

type variables = {};

type response = {
  data: {
    fileUrl: string;
    fileName: string;
  };
};

const useUploadFile = () => {
  const { isLoading, isError, data, error, mutateAsync, mutate } = useMutation({
    mutationFn: (variables: variables) => {
      return uploadApi.post<variables, response>(
        endpoints.upload_single_img,
        variables,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onError: (e: any) => {
      if (e?.message === "Network Error") {
        Toast.show({
          type: "error",
          text1: "Cảnh báo",
          text2: "Không có kết nối mạng. Vui lòng kiểm tra lại",
        });
        return;
      }
      Toast.show({
        type: "error",
        text1: "Cảnh báo",
        text2:
          e?.response?.data?.message ?? "Đã có lỗi xảy ra vui lòng thử lại sau",
      });
    },
  });

  return {
    isLoading,
    isError,
    data: data?.data,
    error,
    mutate,
    mutateAsync,
  };
};

export default useUploadFile;
