import * as React from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

export type RouterContext = {
  // authState: AuthState;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    return <p>Not found</p>;
  },
});

function RootComponent() {
  // const { loginUser, isAuthenticated } = useAuthStore();

  // React.useEffect(() => {
  //   const taskGardenData = localStorage.getItem("taskgarden");

  //   if (taskGardenData) {
  //     const parsedData = JSON.parse(taskGardenData);

  //     if (parsedData?.accessToken) {
  //       const decodedToken = jwtDecode<DecodedToken>(parsedData.accessToken);
  //       const user = {
  //         id: decodedToken.userId,
  //         username: decodedToken.sub,
  //         email: decodedToken.email,
  //         role: "Admin",
  //         tokenExpiration: decodedToken.exp,
  //       };
  //       loginUser(user, parsedData.accessToken);
  //     }
  //   } else {
  //     useAuthStore.getState().logoutUser();
  //   }
  // }, [loginUser]);

  return (
    <React.Fragment>
      {/* <Notifications /> */}

      {/* {isAuthenticated ? <ProtectedLayout /> : <PublicLayout />} */}
    </React.Fragment>
  );
}
