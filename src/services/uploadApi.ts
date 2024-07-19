import initApi from "./initApi";

const uploadApi = initApi("https://ntss-api.apetechs.co");

const coreApi = initApi("https://ape-bot-api-test.apetechs.co");

export { coreApi, uploadApi };

export default uploadApi;
