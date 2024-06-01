import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../assets/colors/colors';
import {
  Avatar,
  SegmentedButtons,
  TextInput,
  Modal,
  Portal,
  PaperProvider,
  Button,
} from 'react-native-paper';

enum TypeOfComment {
  Sugerencia = 'Sugerencia',
  Queja = 'Queja',
}

const get_date = () => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Santo_Domingo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return new Date().toLocaleTimeString('en-US', options);
};

export const Comment = () => {
  const [date, setDate] = useState<string>(get_date());
  return (
    <View style={styles.commentWrapper}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Avatar.Image
          source={require('../../assets/images/img-default-user-icon.jpg')}
          size={40}
        />
        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
          <Text>Fecha</Text>
          <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

interface OpinionProps {
  showModal: boolean;
}

export const Opinion = ({ showModal }: OpinionProps) => {
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = React.useState(showModal);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    setVisible(showModal);
  }, [showModal]);

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      style={{ width: '90%' }}
      contentContainerStyle={styles.modal}>
      <View style={styles.commentWrapper}>
        <SegmentedButtons
          value={value}
          onValueChange={newValue => setValue(newValue)}
          density="regular"
          buttons={[
            {
              label: 'Queja',
              value: 'Queja',
            },
            {
              label: 'Sugerencia',
              value: 'Sugerencia',
            },
          ]}
        />
        <TextInput
          label="Comentario"
          placeholder={`${value}:`}
          mode="outlined"
          style={{
            marginTop: 25,
            backgroundColor:
              value === TypeOfComment.Sugerencia
                ? colors.primary_note
                : colors.danger_note,
          }}
          // left={<MaterialCommunityIcons name="account" />}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    // height: 300,
    // alignSelf: 'center',
    // alignItems: 'center',
    borderWidth: 5,
    borderColor: colors.primary_bg_tint,
    borderRadius: 20,
  },
  commentWrapper: {
    height: 300,
    backgroundColor: colors.white,
    borderRadius: 15,
    alignSelf: 'center',
    width: '100%',
    padding: 15,
    elevation: 1,
  },
});
