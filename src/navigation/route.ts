export const ROUTE_KEY = createEnum({
   // =================================== auth route ==================================
   INTRO: 'INTRO',
   LOGIN: 'LOGIN',
   // ================================= main route ======================================
   HOME: 'HOME',
});

function createEnum<T extends { [P in keyof T]: P }>(o: T) {
   return o;
}
