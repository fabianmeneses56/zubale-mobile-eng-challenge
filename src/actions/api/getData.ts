import { usersApi } from '../../config/api/usersApi';
import { UserAPI } from '../../infrastructure/interfaces/usersApi.response';

export const getUserData = async (): Promise<UserAPI[]> => {
  try {
    const { data } = await usersApi.get<UserAPI[]>('/posts');

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error');
  }
};
