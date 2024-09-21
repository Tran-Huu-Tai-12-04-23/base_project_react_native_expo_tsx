export const ROUTE_KEY = createEnum({
  // =================================== auth route ==================================
  INTRO: "INTRO",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  GET_STARTED: "GET_STARTED",
});

export const BOTTOM_TAB_ROUTE = createEnum({
  HOME: "HOME",
  PERSONAL: "PERSONAL",
  SEARCH: "SEARCH",
  LIBRARY: "LIBRARY",
  CREATE_QUIZ: "CREATE_QUIZ",
});

export const APP_ROUTE = createEnum({
  QUIZ_PLAY: "QUIZ_PLAY",
  CREATE_QUIZ: "CREATE_QUIZ",
  SETTING: "SETTING",
});

function createEnum<T extends { [P in keyof T]: P }>(o: T) {
  return o;
}
