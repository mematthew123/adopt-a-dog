import { useUser } from "@clerk/nextjs";
import UserFavorites from "../components/UserFavorites";


export default function Profile() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return (
      <>
        <div className=" justify-center  text-center font-bold flex align-middle  ">
          Hello {user.fullName}!
        </div>
        <div>
        {isLoaded ? <UserFavorites  /> : "Loading..."}
        </div>
      </>
    );
  }

  return <div>Not signed in</div>;
}
