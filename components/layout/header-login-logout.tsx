"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

// eslint-disable-next-line @next/next/no-async-client-component
export default function SigninButton({ session }: { session: any }) {
  console.log(session);
  if (session?.user) {
    return (
      <div className="flex gap-4 ml-auto items-center">
        <p className="text-sky-600">{session.user.name}</p>
        <Link href="/api/auth/signout">
          <Button className="text-red-600">Sign Out</Button>
        </Link>
      </div>
    );
  }

  return (
    <Link href="/api/auth/signin">
      <Button className="text-green-600 ml-auto">Sign In</Button>
    </Link>
  );
}
