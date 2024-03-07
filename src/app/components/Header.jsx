import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
import Profile from "../profile/page";

export default function Header() {
  const { userId } = auth();
  console.log(userId);
  return (
    <nav className="bg-emerald-700 py-4 px-6 flex items-center justify-between mb-5">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg uppercase font-bold text-white">Muvie</div>
        </Link>
      </div>
      <div className="text-white flex items-center">
        {!userId && (
          <>
            <Link
              href="sign-in"
              className="text-gray-300 hover:text-white mr-4"
            >
              Sign In
            </Link>
            <Link
              href="sign-up"
              className="text-gray-300 hover:text-white mr-4"
            >
              Sign Up
            </Link>
          </>
        )}
        {userId && (
          <Link href="/profile" className="text-gray-300 hover:text-white mr-4">
            View Profile
          </Link>
        )}
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
