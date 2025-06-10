import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  // beforeLoad: async ({ location }) => {
  //   const authState = useAuthStore.getState();
  //   if (!authState.isAuthenticated) {
  //     throw redirect({
  //       to: "/login",
  //       search: { redirect: location.href },
  //     });
  //   }
  // },
  component: AuthLayout,
});

function AuthLayout() {
  // const { user } = useAuthStore();

  // if (!user) {
  //   return null;
  // }

  return (
    <>
      {/* <WelcomeHeader username={user!.username} />
      <FarmProgress /> */}
      <Outlet />
    </>
  );
}

export default AuthLayout;
