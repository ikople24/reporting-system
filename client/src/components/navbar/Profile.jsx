import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { CircleUser } from 'lucide-react'; 

const Profile = () => {
  return (
    <div>
      {/* กรณียังไม่ได้ล็อคอิน */}
      <SignedOut>
        <SignInButton mode="modal">
          <button><CircleUser/></button>
        </SignInButton>


      </SignedOut>

        {/* กรณีล็อคอินแล้ว */}
      <SignedIn mode="modal">
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default Profile