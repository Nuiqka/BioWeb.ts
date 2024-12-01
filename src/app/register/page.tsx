"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const [error, setError] = useState("");
  const [isPublicMode, setIsPublicMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch current mode (public/private)
    fetch("/api/public/mode")
      .then((res) => res.json())
      .then((data) => setIsPublicMode(data.isPublic));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isPublicMode) {
      setError("Registration is currently disabled.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/public/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (!isPublicMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6">Registration Unavailable</h1>
          <p className="text-red-500">Registration is currently disabled.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" name="password" required />
          </div>
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
}
