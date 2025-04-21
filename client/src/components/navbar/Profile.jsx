import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Profile = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn mode="modal">
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default Profile