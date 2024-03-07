import { UserProfile } from "@clerk/nextjs";

export default function Profile() {
  return (
    <>
      <div className="mb-20">
        <UserProfile />
      </div>
    </>
  );
}
