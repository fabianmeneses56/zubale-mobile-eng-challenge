import { Dispatch, RefObject, SetStateAction } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { UserAPI } from './usersApi.response';

export interface Comment {
  id: string;
  comment: string;
}
export type Actions = {
  liked: string[];
  saved: string[];
  likes: { id: string; likes: number }[];
  comments: Comment[];
};

export interface CustomBottomSheetParams {
  bottomSheetRef: RefObject<BottomSheet | null>;
  postComments: Comment[];
  sendComment: () => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

export interface ActionButtonsParams {
  isLiked: boolean;
  item: UserAPI;
  bottomSheetRef: RefObject<BottomSheet | null>;
  setIdPost: Dispatch<SetStateAction<string>>;
  isSaved: boolean;
  toggleSave: (id: string) => void;
  toggleLike: (id: string) => void;
}
