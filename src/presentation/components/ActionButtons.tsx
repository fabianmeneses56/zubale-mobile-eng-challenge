import { View, StyleSheet } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';

import { ActionButtonsParams } from '../../infrastructure/interfaces/homeScreen';

const ActionButtons = ({
  isLiked,
  toggleLike,
  item,
  bottomSheetRef,
  setIdPost,
  isSaved,
  toggleSave,
}: ActionButtonsParams) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstActionContainer}>
        <IconButton
          icon={isLiked ? 'heart' : 'heart-outline'}
          iconColor={isLiked ? '#ed4956' : '#000'}
          size={23}
          style={styles.button}
          selected={isLiked}
          onPress={() => toggleLike(item.id)}
        />
        <IconButton
          icon={'comment-outline'}
          iconColor={'#000'}
          size={23}
          style={styles.button}
          onPress={() => {
            bottomSheetRef.current?.collapse();
            setIdPost(item.id);
          }}
        />
        <IconButton
          icon={'send-variant-outline'}
          iconColor={'#000'}
          size={23}
          style={styles.button}
          selected={item.liked}
          onPress={() => console.log('Pressed')}
        />
      </View>
      <IconButton
        icon={isSaved ? 'bookmark' : 'bookmark-outline'}
        iconColor={'#000'}
        size={23}
        style={styles.button}
        selected={isSaved}
        onPress={() => toggleSave(item.id)}
      />
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstActionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    margin: 0,
  },
});
