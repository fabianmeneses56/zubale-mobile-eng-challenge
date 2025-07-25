import { Image, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { Button, Text } from 'react-native-paper';

import { CustomBottomSheetParams } from '../../infrastructure/interfaces/homeScreen';

const CustomBottomSheet = ({
  bottomSheetRef,
  postComments,
  currentPost,
  sendComment,
  text,
  setText,
}: CustomBottomSheetParams) => {
  const snapPoints = useMemo(() => ['80%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      animateOnMount={false}
      index={-1}
      keyboardBehavior="interactive"
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/image/userImage.png')}
            //   source={{ uri: item.image }}
            style={styles.smallImage}
            resizeMode="cover"
          />
          <BottomSheetTextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
          />

          <Button disabled={!text} onPress={sendComment}>
            Enviar
          </Button>
        </View>
        {postComments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <Image
              source={require('../../assets/image/userImage.png')}
              //   source={{ uri: item.image }}
              style={styles.smallImage}
              resizeMode="cover"
            />
            <View>
              <Text variant="labelLarge">{currentPost?.name}</Text>
              <Text>{comment.comment}</Text>
              <Text>Reply</Text>
            </View>
          </View>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  smallImage: { width: 40, height: 40, borderRadius: 50 },
  commentContainer: {
    width: '100%',
    margin: 5,
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
  },
});
