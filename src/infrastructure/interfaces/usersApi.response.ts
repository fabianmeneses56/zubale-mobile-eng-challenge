export interface UserAPI {
  createdAt: Date;
  name: string;
  avatar: string;
  description: string;
  likes: number;
  image: string;
  comments: number;
  liked: boolean;
  saved: boolean;
  location: string;
  id: string;
}
