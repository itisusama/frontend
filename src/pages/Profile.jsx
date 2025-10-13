import {ProfileHeader, ProfileTabs} from "../components/components";
const Profile = () => {
  return (
    <>
      <ProfileHeader badges={["Pro", "Helper"]} stats={{ fans: 1200, likes: 800, messages: 20, comments: 55, reads: 3400 }} />
      <ProfileTabs/>
    </>
  )
}

export default Profile
