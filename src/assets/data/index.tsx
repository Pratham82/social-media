import {
  HomeIcon,
  ExploreIcon,
  BookmarkIcon,
  NotificationIcon,
  ProfileIcon,
  CommentIcon,
  LikeIcon,
} from "assets/svg/icons/index";

export const sidebarData = [
  {
    id: 1,
    title: "Home",
    link: "/home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    title: "Explore",
    link: "/explore",
    icon: <ExploreIcon />,
  },
  {
    id: 3,
    title: "Bookmarks",
    link: "/bookmarks",
    icon: <BookmarkIcon />,
  },
  {
    id: 4,
    title: "Notifications",
    link: "/notifications",
    icon: <NotificationIcon />,
  },
  {
    id: 5,
    title: "Profile",
    link: "/profile",
    icon: <ProfileIcon />,
  },
];

export const postIcons = [
  { id: 1, icon: <CommentIcon /> },
  { id: 2, icon: <LikeIcon /> },
  { id: 3, icon: <BookmarkIcon /> },
];
