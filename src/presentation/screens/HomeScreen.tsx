/* eslint-disable react-native/no-inline-styles */
import { FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import { getUserData } from '../../actions/api/getData';
import { IconButton, Text } from 'react-native-paper';
import 'moment/locale/es';

const STORAGE_KEY = 'USER_ACTIONS';
type Actions = {
  liked: string[];
  saved: string[];
  likes: { id: string; likes: number }[];
};

export function formatLikesLocale(count: number): string {
  return count.toLocaleString('es-CO');
}

const HomeScreen = () => {
  const [actions, setActions] = useState<Actions>({
    liked: [],
    saved: [],
    likes: [],
  });

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
  useEffect(() => {
    console.log(actions);
  }, [actions]);

  const { isLoading, data, isError } = useQuery({
    queryKey: ['usersData'],
    queryFn: () => getUserData(),
  });

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
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {data && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const isLiked = actions.liked.includes(item.id);
              const isSaved = actions.saved.includes(item.id);
              const likes =
                actions.likes.find(res => res.id === item.id)?.likes ?? 0;
              return (
                <View key={item.id} style={{ margin: 10 }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingVertical: 15,
                      paddingHorizontal: 5,
                      gap: 13,
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={require('../../assets/image/userImage.png')}
                      //   source={{ uri: item.image }}
                      style={{ width: 40, height: 40, borderRadius: 50 }}
                      resizeMode="cover"
                    />
                    <View>
                      <Text variant="labelLarge">{item.name}</Text>
                      <Text>{item.location}</Text>
                    </View>
                  </View>
                  <Image
                    source={require('../../assets/image/demo.jpg')}
                    //   source={{ uri: item.image }}
                    style={{ width: '100%' }}
                    resizeMode="cover"
                  />
                  <View style={{ marginTop: 5 }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // paddingHorizontal: 5,
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <IconButton
                          icon={isLiked ? 'heart' : 'heart-outline'}
                          iconColor={isLiked ? '#ed4956' : '#000'}
                          size={23}
                          style={{ margin: 0 }}
                          selected={isLiked}
                          onPress={() => toggleLike(item.id)}
                        />
                        <IconButton
                          icon={'comment-outline'}
                          iconColor={'#000'}
                          size={23}
                          style={{ margin: 0 }}
                          // selected={item.liked}
                          onPress={() => toggleSave(item.id)}
                        />
                        <IconButton
                          icon={'send-variant-outline'}
                          iconColor={'#000'}
                          size={23}
                          style={{ margin: 0 }}
                          selected={item.liked}
                          onPress={() => console.log('Pressed')}
                        />
                      </View>
                      <IconButton
                        icon={isSaved ? 'bookmark' : 'bookmark-outline'}
                        iconColor={'#000'}
                        size={23}
                        style={{ margin: 0 }}
                        selected={isSaved}
                        onPress={() => toggleSave(item.id)}
                      />
                    </View>
                    <Text style={{ paddingHorizontal: 5 }}>
                      {formatLikesLocale(likes)} Me gusta
                    </Text>
                    <View style={{ paddingHorizontal: 5, marginTop: 5 }}>
                      <Text variant="labelLarge">
                        {item.name} <Text>{item.description}</Text>
                      </Text>
                      <Text>{formatLikesLocale(item.comments)} respuestas</Text>
                      <Text>{moment(item.createdAt).fromNow()}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
            //   contentContainerStyle={styles.contentContainer}
          />
        </View>
      )}
      {isError && <Text>error...</Text>}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
