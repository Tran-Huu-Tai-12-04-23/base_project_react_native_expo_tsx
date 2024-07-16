export const ROUTE_KEY = createEnum({
  // =================================== auth route ==================================
  INTRO: "INTRO",
  LOGIN: "LOGIN",
});

export const BOTTOM_TAB_ROUTE = createEnum({
  HOME: "HOME",
  TASK: "TASK",
  NOTIFICATION: "NOTIFICATION",
  PROFILE: "PROFILE",
});

function createEnum<T extends { [P in keyof T]: P }>(o: T) {
  return o;
}
