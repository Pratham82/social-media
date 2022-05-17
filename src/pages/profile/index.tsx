import Container from "components/container";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const Profile: React.FC = (): JSX.Element => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <Container title="Profile">
        {currentUser && (
          <>
            <div className="h-[200px]">
              <Image
                src="/profile-bg.jpg"
                alt="profile"
                width="600px"
                height="200px"
                className="object-cover object-center"
              />
            </div>

            <div className="mx-3 mb-3 mt-[-50px] flex justify-between rounded-full">
              <Image
                src={currentUser?.profile_image_url || "/profile.png"}
                alt={currentUser?.fullName}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="mx-4">
              <p className="text-lg font-semibold">{currentUser?.fullName}</p>
              <p className="pt-[0px] text-sm text-gray-500">
                {currentUser?.username}
              </p>
              <p className="text-sm">
                Software Dev | React.js | JavaScript | TypeScript
              </p>
              <div className="flex text-sm">
                <p className="pr-2">
                  <span className="pr-1 font-bold">
                    {currentUser?.followers?.length}
                  </span>
                  Followers
                </p>
                <p>
                  <span className="pr-1 font-bold">
                    {currentUser?.following?.length}
                  </span>
                  Following
                </p>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Profile;
