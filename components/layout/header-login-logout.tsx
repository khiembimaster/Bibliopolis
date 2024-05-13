"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import HeaderShoppingCart from "./header-shopping-cart";
import Headerstatusorder from "./header-status-order";

// eslint-disable-next-line @next/next/no-async-client-component
export default function SigninButton({ session }: { session: any }) {
  console.log(session);
  if (session?.user) {
    return (
      <div className={"flex items-center gap-5"}>
          <HeaderShoppingCart />
          <Headerstatusorder/>
      
      <div className="flex gap-4 ml-auto items-center">
        <p className="text-sky-600">{session.user.name}</p>
        <Link href="/api/auth/signout">
          <Button className="text-red-600">Sign Out</Button>
        </Link>
      </div>
      </div>
    );
  }

  return (
    <Link href="/api/auth/signin">
      <Button className="text-green-600 ml-auto">Sign In</Button>
    </Link>
  );
}
