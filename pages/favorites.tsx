/* eslint-disable react/no-unescaped-entities */
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
        <h1 className="text-3xl font-bold mb-6">{user.fullName}'s Favorites</h1>
        </div>
        <div>
        {isLoaded ? <UserFavorites  /> : "Loading..."}
        </div>
      </>
    );
  }

  return <h2 className=" justify-center  text-center font-bold flex align-middle  "> You are not currently signed in</h2>
}
