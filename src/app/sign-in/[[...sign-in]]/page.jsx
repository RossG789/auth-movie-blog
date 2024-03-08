import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="container flex flex-col items-center align-center ">
        <h1 className="mb-1 text-xl text-emerald-800">
          Please Sign In/Sign Up
        </h1>
        <h1 className="mb-6 text-lg text-emerald-800">
          To access the Timeline
        </h1>

        <div>
          <SignIn />
        </div>
      </div>
    </>
  );
}
