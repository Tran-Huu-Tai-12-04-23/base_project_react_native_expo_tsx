import initApi from "./initApi";

const rootApi = initApi(
  process.env.EXPO_PUBLIC_APP_API || "https://ape-bot-api.apetechs.co"
);

export default rootApi;
