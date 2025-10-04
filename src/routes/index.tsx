// import { createFileRoute, redirect, Link } from "@tanstack/react-router";
// import { Button } from "@/shared/components/ui/button";
// import { useAuthStore } from "@/features/auth/authStore";
// import logo from "@/assets/cloud-crate-logo.png";

// export const Route = createFileRoute("/")({
//   beforeLoad: ({ context }) => {
//     const isAuthenticated = useAuthStore.getState().isAuthenticated;
//     if (isAuthenticated) {
//       throw redirect({ to: "/crates" });
//     }
//   },
//   component: LandingPage,
// });

// function LandingPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <img src={logo} alt="Cloud Crate Logo" className="h-8 w-8" />
//             <h3 className="font-bold text-2xl text-primary">Cloud Crate</h3>
//           </div>
//           <div className="flex items-center gap-4">
//             <Link to="/login">
//               <Button variant="ghost">Login</Button>
//             </Link>
//             <Link to="/register">
//               <Button>Get Started</Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center space-y-8">
//             <h1 className="text-5xl md:text-7xl font-bold">
//               Experience the cloud storage with <span className="text-primary">CloudCrate</span>
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Store, share, and collaborate on all your files with friends, family, or colleagues, and even work as
//               teams.
//             </p>
//             <div className="flex gap-4 justify-center">
//               <Link to="/register">
//                 <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="bg-primary text-primary-foreground py-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//             Trust CloudCrate, trusted by users around the world
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <div>
//               <div className="text-5xl font-bold mb-2">100+</div>
//               <div className="text-lg opacity-90">Active Users</div>
//             </div>
//             <div>
//               <div className="text-5xl font-bold mb-2">1000+</div>
//               <div className="text-lg opacity-90">Files Uploaded</div>
//             </div>
//             <div>
//               <div className="text-5xl font-bold mb-2">99.9%</div>
//               <div className="text-lg opacity-90">Uptime Guaranteed</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//               We offer a range of advanced features to help you manage your files with precision and efficiency
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//               Our platform is designed to make it easy for you to protect your files from anywhere, at any time, with
//               features like automatic backup, version control, and more.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-card p-8 rounded-lg border">
//               <h3 className="text-2xl font-bold mb-4">Share and collaborate - all in one place</h3>
//               <p className="text-muted-foreground mb-6">
//                 Try CloudCrate today and experience seamless collaboration and sharing with your team, all in one secure
//                 platform.
//               </p>
//             </div>

//             <div className="bg-card p-8 rounded-lg border">
//               <h3 className="text-2xl font-bold mb-4">Your files, always safe and accessible on our cloud</h3>
//               <p className="text-muted-foreground mb-6">
//                 With our cloud platform, you can rest assured your files will always exist and stay safe, accessible
//                 from anywhere at any time.
//               </p>
//             </div>

//             <div className="bg-card p-8 rounded-lg border">
//               <h3 className="text-2xl font-bold mb-4">Store more, worry less with CloudCrate cloud storage</h3>
//               <p className="text-muted-foreground mb-6">
//                 CloudCrate provides unlimited storage space so you can store all your important files without worrying
//                 about running out of space.
//               </p>
//             </div>

//             <div className="bg-card p-8 rounded-lg border">
//               <h3 className="text-2xl font-bold mb-4">The easy way to stay organized</h3>
//               <p className="text-muted-foreground mb-6">
//                 Organize all your files in one place with CloudCrate, making it easy for you to easily store and sort
//                 your files.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-primary text-primary-foreground py-20 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">Get organized and stay productive with CloudCrate</h2>
//           <p className="text-xl opacity-90 mb-8">
//             Join thousands of users who trust CloudCrate for their file storage and collaboration needs
//           </p>
//           <Link to="/register">
//             <Button size="lg" variant="secondary" className="text-lg px-8">
//               Get Started
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t py-12 px-6">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <img src={logo} alt="Cloud Crate Logo" className="h-8 w-8" />
//             <h3 className="font-bold text-xl text-primary">Cloud Crate</h3>
//           </div>
//           <p className="text-sm text-muted-foreground mb-8">Your secure cloud storage solution</p>

//           <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
//             © 2025 CloudCrate. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/features/auth/authStore";
import logo from "@/assets/cloud-crate-logo.png";
import { Check } from "lucide-react";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/crates" });
    }
  },
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Cloud Crate Logo" className="h-8 w-8" />
            <h3 className="font-bold text-xl text-white">CloudCrate</h3>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-gray-800">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Your All-in-One Cloud Storage Solution
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Experience seamless file management with advanced collaboration tools designed for individuals and teams
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>

          {/* Mock Dashboard Preview */}
          <div className="mt-16 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
            <div className="bg-gray-900 p-8">
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-gray-800 rounded w-1/3" />
                  <div className="h-4 bg-gray-800/50 rounded w-2/3" />
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-24 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simplify Your Digital Life with Smart Tools</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to organize, collaborate, and secure your files in one powerful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-600/50 transition-all">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-blue-600 rounded" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Share and Collaborate</h3>
              <p className="text-gray-400">
                Work together seamlessly with real-time collaboration and secure file sharing
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-600/50 transition-all">
              <div className="w-12 h-12 bg-purple-600/10 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-purple-600 rounded" />
              </div>
              <h3 className="text-2xl font-bold mb-4">User-Friendly Interface</h3>
              <p className="text-gray-400">
                Intuitive design that makes file management simple and efficient for everyone
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-600/50 transition-all">
              <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-green-600 rounded" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Organization</h3>
              <p className="text-gray-400">Powerful tools to organize and manage your files with precision and ease</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Flexible & Transparent Pricing for Every Need</h2>
            <p className="text-xl text-gray-400">Choose the plan that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-2">Basic Plan</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-300">10GB of cloud storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-300">Basic file sharing</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-300">Community support</span>
                </li>
              </ul>
              <Link to="/register" className="block">
                <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                  Subscribe Plan
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-700 p-8 rounded-xl border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">$10</span>
                <span className="text-blue-100">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5" />
                  <span>100 GB of cloud storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5" />
                  <span>File Storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5" />
                  <span>Advanced sharing features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link to="/register" className="block">
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Subscribe Plan</Button>
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-2">Business Plan</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">$25</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-300">Unlimited storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-300">Team collaboration tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-300">Advanced security</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-300">24/7 dedicated support</span>
                </li>
              </ul>
              <Link to="/register" className="block">
                <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                  Subscribe Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Organized and Stay Productive with CloudCrate</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust CloudCrate for secure cloud storage
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={logo} alt="Cloud Crate Logo" className="h-8 w-8" />
            <h3 className="font-bold text-xl">CloudCrate</h3>
          </div>
          <p className="text-sm text-gray-400 mb-8">Your secure cloud storage solution</p>

          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
            © 2025 CloudCrate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
