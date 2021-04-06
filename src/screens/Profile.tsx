import { gql, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import styled from "styled-components";
import Header from "../components/Header";
import useUser from "../components/hooks/useUser";
import { FatText, HelmetTitle } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";

const FOLLOWER_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;
const UNFOLLOWER_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowers
      totalFollowing
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ProfileData = styled.div`
  max-width: 700px;
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const ProfileAvatarContainer = styled.div`
  max-width: 130px;
  height: 130px;
  background-color: black;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 25% 0 0;
`;
const ProfileAvatar = styled.img`
  width: 100%;
  height: 100%;
`;
const ProfileContext = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;
  height: 115px;
`;
const Username = styled.span`
  font-weight: 600;
  font-size: 18px;
  margin-right: 10px;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const FollowerContainer = styled.div`
  display: flex;
`;
const FollowNumbers = styled.span`
  font-weight: 600;
  font-size: 14px;
  margin-right: 5px;
`;
const Followers = styled.span`
  margin-right: 5px;
`;
const FirstName = styled(FatText)``;
const Bio = styled.span``;

const PhotoContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 310px;
  gap: 30px;
`;

const Photos = styled.div<{ url: string }>`
  background-image: url(${(props) => `${props.url}`});
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
`;
const Icons = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  svg,
  span {
    font-size: 20px;
    margin-right: 5px;
  }
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBtn = styled.span`
  width: 100%;
  padding: 6px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.buttonColor};
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
`;

const Profile = () => {
  const { data: userData } = useUser();
  const { username } = useParams<{ username: string }>();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  const [followUser, { loading: followLoading }] = useMutation(
    FOLLOWER_USER_MUTATION,
    {
      variables: {
        username,
      },
      update: (cache, result) => {
        const {
          data: {
            followUser: { ok },
          },
        } = result;
        if (ok) {
          cache.modify({
            id: `User:${username}`,
            fields: {
              isFollowing(prev) {
                return true;
              },
              totalFollowers(prev) {
                return prev + 1;
              },
            },
          });
          const { me } = userData;
          cache.modify({
            id: `User:${me.username}`,
            fields: {
              totalFollowing(prev) {
                return prev + 1;
              },
            },
          });
        }
      },
    }
  );
  const [unfollowUser, { loading: unfollowLoading }] = useMutation(
    UNFOLLOWER_USER_MUTATION,
    {
      variables: {
        username,
      },
      update: (cache, result) => {
        const {
          data: {
            unfollowUser: { ok },
          },
        } = result;
        if (ok) {
          cache.modify({
            id: `User:${username}`,
            fields: {
              isFollowing(prev) {
                return false;
              },
              totalFollowers(prev) {
                return prev - 1;
              },
            },
          });
          const { me } = userData;
          cache.modify({
            id: `User:${me.username}`,
            fields: {
              totalFollowing(prev) {
                return prev - 1;
              },
            },
          });
        }
      },
    }
  );
  const getButton = (seeProfile: any) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return (
        <ProfileBtn
          onClick={() => (unfollowLoading ? "Loading..." : unfollowUser())}
        >
          Unfollow
        </ProfileBtn>
      );
    } else {
      return (
        <ProfileBtn
          onClick={() => (followLoading ? "Loading..." : followUser())}
        >
          Follow
        </ProfileBtn>
      );
    }
  };
  return (
    <>
      <HelmetTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username} 's Profile`
        }
      />
      <Header />
      <ProfileContainer>
        <ProfileData>
          <ProfileAvatarContainer>
            <ProfileAvatar src={data?.seeProfile?.avatar} />
          </ProfileAvatarContainer>
          <ProfileContext>
            <Column>
              <Username>{data?.seeProfile?.username}</Username>
              {data?.seeProfile ? getButton(data?.seeProfile) : null}
            </Column>
            <FollowerContainer>
              <FollowNumbers>{data?.seeProfile?.totalFollowers}</FollowNumbers>
              <Followers>followers</Followers>
              <FollowNumbers>{data?.seeProfile?.totalFollowing}</FollowNumbers>
              <span>following</span>
            </FollowerContainer>
            <FirstName>{data?.seeProfile?.firstName}</FirstName>
            <Bio>{data?.seeProfile?.bio}</Bio>
          </ProfileContext>
        </ProfileData>
        <PhotoContainer>
          {data?.seeProfile?.photos?.map((photo: any) =>
            photo ? (
              <div key={photo.id}>
                <Photos url={photo.file}>
                  <Icons>
                    <Icon>
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{photo.likes}</span>
                    </Icon>
                    <Icon>
                      <FontAwesomeIcon icon={faComment} />
                      <span>{photo.commentNumbers}</span>
                    </Icon>
                  </Icons>
                </Photos>
              </div>
            ) : null
          )}
        </PhotoContainer>
      </ProfileContainer>
    </>
  );
};

export default Profile;
