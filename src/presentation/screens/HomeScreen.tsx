/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUserData } from '../../actions/api/getData';
import { IconButton } from 'react-native-paper';

const STORAGE_KEY = 'USER_ACTIONS';
type Actions = {
  liked: string[];
  saved: string[];
};

const HomeScreen = () => {
  const [actions, setActions] = useState<Actions>({ liked: [], saved: [] });

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

      setActions({
        liked: likedFromServer,
        saved: savedFromServer,
      });
    }
  }, [data, actions]);

  const toggleLike = (id: string) => {
    setActions(prev => {
      const liked = new Set(prev.liked);

      const adding = !liked.has(id);
      if (adding) liked.add(id);
      else liked.delete(id);
      return { ...prev, liked: Array.from(liked) };
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
              return (
                <View key={item.id} style={{ margin: 10 }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingVertical: 15,
                      paddingHorizontal: 5,
                      gap: 5,
                    }}
                  >
                    <Text>foto</Text>
                    <Text>{item.name}</Text>
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
                        paddingHorizontal: 5,
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

                    <View
                      style={{ paddingHorizontal: 5, marginTop: 5, gap: 5 }}
                    >
                      <Text>
                        {item.name} {item.description}
                      </Text>
                      <Text>hace {String(item.createdAt)}</Text>
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
