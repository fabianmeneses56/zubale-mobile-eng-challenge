import { usersApi } from '../../config/api/usersApi';
import { UserAPI } from '../../infrastructure/interfaces/usersApi.response';

export const getUserData = async (): Promise<UserAPI[]> => {
  try {
    const { data } = await usersApi.get<UserAPI[]>('/posts');

    // const forecastFormat = data.pronostico.map(
    //   ForecastMapper.forecastSiataToEntity,
    // );
    // const response = {
    //   date: data.date,
    //   forecast: [...forecastFormat],
    // };
    console.log('entro aca');
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error');
  }
};
