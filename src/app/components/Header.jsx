import Link from "next/link";
import { UserButton, auth, SignedIn, SignedOut } from "@clerk/nextjs";

export default async function Header() {
  const { userId } = auth();

  return (
    <nav className="bg-emerald-700 py-4 px-6 flex items-center justify-between mb-5">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg uppercase font-bold text-white hover:text-emerald-500">
            Muvie
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/timeline">
          <div className="mr-2 text-lg uppercase font-bold text-white hover:text-emerald-500">
            Timeline
          </div>
        </Link>
        <Link href="/add-review">
          <div className="ml-2 text-lg uppercase font-bold text-white hover:text-emerald-500">
            Add Review
          </div>
        </Link>
      </div>

      <div className="text-white flex items-center">
        <SignedOut>
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
        </SignedOut>

        <SignedIn>
          <Link href="/profile" className="text-gray-300 hover:text-white mr-4">
            View Profile
          </Link>
        </SignedIn>
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
