import { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';

import { UserAPI } from '../../infrastructure/interfaces/usersApi.response';
import { Actions, Comment } from '../../infrastructure/interfaces/homeScreen';
import { STORAGE_KEY } from '../utils/constanst';
import { getUserData } from '../../actions/api/getData';

export const useHomeScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [idPost, setIdPost] = useState<string>('');
  const [currentPost, setCurrentPost] = useState<UserAPI>();
  const [actions, setActions] = useState<Actions>({
    liked: [],
    saved: [],
    likes: [],
    comments: [],
  });
  const [text, setText] = useState('');
  const [postComments, setPostComments] = useState<Comment[]>([]);
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(json => {
        if (json) setActions(JSON.parse(json));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(actions)).catch(
      console.error,
    );
  }, [actions]);

  const { isLoading, data, isError } = useQuery({
    queryKey: ['usersData'],
    queryFn: () => getUserData(),
  });

  useEffect(() => {
    const commentsFilter =
      actions.comments.filter(res => res.id === String(idPost)) ?? [];
    setPostComments(commentsFilter);
  }, [actions.comments, idPost]);
  useEffect(() => {
    const currentPostData = data?.find(res => res.id === idPost);
    setCurrentPost(currentPostData);
  }, [idPost, data]);

  useEffect(() => {
    if (data) {
      if (actions.liked.length || actions.saved.length) return;

      const likedFromServer = data.filter(u => u.liked).map(u => u.id);

      const savedFromServer = data.filter(u => u.saved).map(u => u.id);

      const likesFromServer = data.map(u => {
        return { id: u.id, likes: u.likes };
      });

      setActions({
        liked: likedFromServer,
        saved: savedFromServer,
        likes: likesFromServer,
        comments: [],
      });
    }
  }, [data, actions]);

  const toggleLike = (id: string) => {
    setActions(prev => {
      const isAdding = !prev.liked.includes(id);
      const sumOrRest = isAdding ? 1 : -1;
      const newLiked = isAdding
        ? [...prev.liked, id]
        : prev.liked.filter(item => item !== id);

      const newLikes = prev.likes.map(res =>
        res.id === id ? { ...res, likes: res.likes + sumOrRest } : res,
      );

      return {
        ...prev,
        liked: newLiked,
        likes: newLikes,
      };
    });
  };
  const toggleSave = (id: string) => {
    setActions(prev => {
      const saved = new Set(prev.saved);
      if (saved.has(id)) saved.delete(id);
      else saved.add(id);
      return { ...prev, saved: Array.from(saved) };
    });
  };

  const sendComment = () => {
    setText('');
    Keyboard.dismiss();
    setActions(prev => {
      const newComment: { id: string; comment: string } = {
        id: idPost,
        comment: text,
      };
      const newCommentArray = [...prev.comments, newComment];

      return { ...prev, comments: newCommentArray };
    });
  };

  return {
    toggleLike,
    toggleSave,
    sendComment,
    bottomSheetRef,
    isLoading,
    data,
    isError,
    setIdPost,
    postComments,
    currentPost,
    actions,
    text,
    setText,
  };
};
