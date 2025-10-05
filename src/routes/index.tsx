import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/features/auth/authStore";
import logo from "@/assets/cloud-crate-logo.png";
import CloudCrate from "../../public/cloudcrate.png";
import CloudCrateMobile from "../../public/cloud-crate-mobie.png";
import ManageMembers from "../../public/manage-members.png";
import ManageDeletedFiles from "../../public/manage-trash.png";
import AdminPanel from "../../public/admin-panel.png";
import { FeatureCard } from "@/shared/components/FeatureCard";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/crates" });
    }
  },
  component: LandingPage,
});

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function LandingPage() {
  const features = [
    {
      image: ManageMembers,
      title: "Invite & Collaborate",
      description: "Add members to your crates to share, upload, and manage files together—all in one secure space.",
    },
    {
      image: ManageDeletedFiles,
      title: "Recover with Ease",
      description:
        "Accidentally deleted something? Restore files from the trash or permanently remove them when you're ready.",
    },
    {
      image: AdminPanel,
      title: "Powerful User Management",
      description: "Control access, set roles, and monitor activity from a centralized admin dashboard.",
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Cloud Crate Logo" className="h-8 w-8" />
            <h3 className="font-bold text-xl text-foreground">CloudCrate</h3>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:bg-secondary">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary text-black">Get Started</Button>
            </Link>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-4">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Cloud Crate Logo" className="h-8 w-8" />
                <h3 className="font-bold text-xl text-foreground">CloudCrate</h3>
              </div>
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="text-foreground hover:bg-secondary w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-primary text-black w-full">Get Started</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <motion.section
        className="relative py-20 px-6 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        variants={fadeUpVariants}
      >
        <div className="absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Your All-in-One Cloud Storage Solution
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Experience seamless file management with advanced collaboration tools designed for individuals and teams
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>

          <div className="hidden md:block mt-20 w-full max-w-[1400px] mx-auto">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-muted">
              <img src={CloudCrate} alt="CloudCrate Dashboard Preview" className="w-full h-auto" />
            </div>
          </div>

          <div className="md:hidden mt-16 -mr-6 ml-0">
            <div className="rounded-l-xl shadow-2xl border-l border-t border-b border-muted">
              <img src={CloudCrateMobile} alt="CloudCrate Dashboard Preview" />
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            variants={fadeUpVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simplify Your Digital Life with Smart Tools</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to organize, collaborate, and secure your files in one powerful platform
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 place-items-center lg:place-items-stretch">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                variants={fadeUpVariants}
              >
                <FeatureCard image={feature.image} title={feature.title} description={feature.description} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        className="py-24 px-6 bg-gradient-to-b from-background to-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        variants={fadeUpVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Organized and Stay Productive with CloudCrate</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust CloudCrate for secure cloud storage
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.section>

      <footer className="py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={logo} alt="Cloud Crate Logo" className="h-8 w-8" />
            <h3 className="font-bold text-xl">CloudCrate</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Your secure cloud storage solution</p>
          <div className="mt-8 pt-8 border-t border-muted text-sm text-muted-foreground">
            © 2025 CloudCrate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
