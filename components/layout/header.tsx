import Link from "next/link";
import HeaderDropdownMenu from "./header-dropdown-menu";
import HeaderShoppingCart from "./header-shopping-cart";
import SignIn_SignOut from "./header-login-logout";

export default function Header({ session }: { session: any }) {
  return (
    <header className={"fixed w-full top-0 z-50 bg-white shadow"}>
      <div className={"container flex items-center justify-between gap-5 h-24"}>
        <Link href={"/"} className={"text-red-800 text-4xl italic font-bold"}>
          Bibliopolis
        </Link>
        <div className={"hidden lg:flex gap-12"}>
          <Link href={"/"}>Home Page</Link>
          <Link href={"/products"}>Product</Link>
          <Link href={"/about"}>About</Link>
        </div>
        <div className={"flex items-center gap-5"}>
          <HeaderDropdownMenu />
          <HeaderShoppingCart />
          <SignIn_SignOut session={session} />
        </div>
      </div>
    </header>
  );
}
