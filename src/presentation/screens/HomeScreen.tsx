/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getUserData } from '../../actions/api/getData';
// import { UserAPI } from '../../infrastructure/interfaces/usersApi.response';

const HomeScreen = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['usersData'],
    queryFn: () => getUserData(),
  });

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {data && (
        // data.map(user => {
        //   return <Text key={user.id}>{user.name}</Text>;
        // })}
        <View style={{ flex: 1 }}>
          <FlatList
            //   contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
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
                        gap: 10,
                      }}
                    >
                      <Text>like</Text>
                      <Text>comentario</Text>
                      <Text>send</Text>
                    </View>
                    <Text>save</Text>
                  </View>

                  <View style={{ paddingHorizontal: 5, marginTop: 5, gap: 5 }}>
                    <Text>
                      {item.name} {item.description}
                    </Text>
                    <Text>hace {String(item.createdAt)}</Text>
                  </View>
                </View>
              </View>
            )}
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
