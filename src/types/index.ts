import { ReactNode } from "react";

export interface IChildrenProps {
  children?: ReactNode;
}

export interface IButton {
  children: React.ReactNode;
  size?: "medium" | "large" | "xl" | "full";
  variant?: "primary" | "success" | "danger";
  onClick?: (e?: any) => any;
  rounded?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface IContainerProps extends IChildrenProps {
  title?: string;
}

export interface IListItemProps extends IChildrenProps {
  id: string | number;
}

export interface ISidebarItem {
  id: number;
  title: string;
  link: string;
  icon: JSX.Element;
}
export interface ISidebarItemProps extends IChildrenProps {
  link: string;
}

export interface IPostItem {
  id: number;
  icon: JSX.Element;
}

export interface IUserSliceState {
  currentUser: any;
  token: string | null;
  STATUS: string;
}

export interface IPostsSliceState {
  posts: [];
  postsCount: number;
  STATUS: string;
}

export interface ICreatedBy {
  fullName: string;
  profile_image_url: string;
}
export interface IPostCardProps {
  _id: string;
  createdAt: string;
  createdBy: ICreatedBy;
  postContent: string;
  postImage: string;
  likes: [string];
  comments: [string];
}

export interface IPostCard {
  postData: IPostCardProps;
}

export interface IDropDownProps {
  postId: string;
}
