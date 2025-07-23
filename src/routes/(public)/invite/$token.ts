// import { useAuthStore, useUserStore } from '@/features/auth/store';
// import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
// import { useEffect } from 'react';

// export const Route = createFileRoute('/(public)/invite/$token')({
//   component: InviteHandlerPage,
// })

// export default function InviteHandlerPage() {
//   const { token } = useParams({strict: false});
//   const navigate = useNavigate();
//   const { user } = useUserStore();
//   const isAuthenticated = useAuthStore.getState().isAuthenticated();
//   // const { data: invite, isLoading, error } = useGetInviteByToken(token!);
//   // const { mutateAsync: acceptInvite } = useAcceptInvite();

//   useEffect(() => {
//     if (!token || isLoading || error) return;

//     if (!isAuthenticated) {
//       // Redirect to signup with token in query
//       navigate(`/signup?inviteToken=${token}`);
//       return;
//     }

//     // Optional: Check if invite.email matches user.email
//     const proceed = window.confirm(`You've been invited to join ${invite.crateName}. Accept?`);
//     if (proceed) {
//       acceptInvite({ token }).then(() => {
//         navigate(`/crates/${invite.crateId}`);
//       });
//     }
//   }, [token, isAuthenticated, isLoading, error]);

//   if (isLoading) return <div>Loading invite...</div>;
//   if (error) return <div>Invalid or expired invite.</div>;

//   return <div>Processing invite...</div>;
// }
