import initApi from "./initApi";

const authApi = initApi(process.env.EXPO_PUBLIC_APP_API);

export default authApi;
