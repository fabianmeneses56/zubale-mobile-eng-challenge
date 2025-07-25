/* eslint-disable react-native/no-inline-styles */
import { FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import moment from 'moment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import 'moment/locale/es';

import CustomBottomSheet from '../components/CustomBottomSheet';
import LoadingScreen from './LoadingScreen';
import { formatLikesLocale } from '../../config/utils/formats';
import ActionButtons from '../components/ActionButtons';
import { useHomeScreen } from '../../config/hooks/useHomeScreen';

const HomeScreen = () => {
  const {
    isLoading,
    isError,
    data,
    actions,
    toggleLike,
    bottomSheetRef,
    setIdPost,
    toggleSave,
    postComments,
    currentPost,
    sendComment,
    text,
    setText,
  } = useHomeScreen();

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        {isLoading && <LoadingScreen />}
        {isError && <Text>error...</Text>}
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
                    <View style={styles.headerContainer}>
                      <Image
                        source={require('../../assets/image/userImage.png')}
                        //   source={{ uri: item.image }}
                        style={styles.smallImage}
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
                      <ActionButtons
                        isLiked={isLiked}
                        toggleLike={toggleLike}
                        item={item}
                        bottomSheetRef={bottomSheetRef}
                        setIdPost={setIdPost}
                        isSaved={isSaved}
                        toggleSave={toggleSave}
                      />
                      <Text style={{ paddingHorizontal: 5 }}>
                        {formatLikesLocale(likes)} Me gusta
                      </Text>
                      <View style={{ paddingHorizontal: 5, marginTop: 5 }}>
                        <Text variant="labelLarge">
                          {item.name} <Text>{item.description}</Text>
                        </Text>
                        <Text>
                          {formatLikesLocale(item.comments)} respuestas
                        </Text>
                        <Text>{moment(item.createdAt).fromNow()}</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}

        <CustomBottomSheet
          bottomSheetRef={bottomSheetRef}
          postComments={postComments}
          currentPost={currentPost}
          sendComment={sendComment}
          text={text}
          setText={setText}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
    gap: 13,
    alignItems: 'center',
  },
  smallImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
