import initApi from "./initAPI";

const rootApi = initApi(process.env.EXPO_PUBLIC_API);

export default rootApi;
