"use client";

import { useState } from "react";
import FeedbackForm from "@/components/feedback-form";
import FeedbackList from "@/components/feedback-list";
import ThemeToggle from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowAdmin(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <h1 className="text-xl font-bold">Feedback Collector</h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="mx-auto max-w-2xl">
            {!showAdmin ? (
              <div>
                <button
                  onClick={() => setShowAdmin(true)}
                  className="mb-8 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  View Submitted Feedback
                </button>
                <FeedbackForm />
              </div>
            ) : !isAuthenticated ? (
              <div className="space-y-4">
                <button
                  onClick={() => setShowAdmin(false)}
                  className="mb-8 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
                >
                  Back to Form
                </button>
                <div className="p-4 border rounded-md space-y-4">
                  <h2 className="text-lg font-semibold">
                    Admin Authentication
                  </h2>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <button
                    onClick={handleLogin}
                    className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Login as Admin
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setShowAdmin(false);
                    setIsAuthenticated(false);
                    setPassword("");
                  }}
                  className="mb-8 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  Back to Form
                </button>
                <FeedbackList />
              </div>
            )}
          </div>
        </main>

        <footer className="border-t py-4 bg-muted/40">
          <div className="container text-center text-sm text-muted-foreground">
            Feedback Collector - Created by Sahil Tiwari -{" "}
            {new Date().getFullYear()}
              <h4 className="text-green-500">Admin Password = 777777</h4>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
