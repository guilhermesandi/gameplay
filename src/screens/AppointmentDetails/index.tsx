import React from 'react';
import { useRoute } from '@react-navigation/core';
import { Fontisto } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler';

import { ImageBackground, Text, View, FlatList } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import BannerImg from '../../assets/banner.png';

import { AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';

type Params = {
  guildSelected: AppointmentProps;
}


export function AppointmentDetails() {
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const members = [
    {
      id: '1',
      username: 'Guilherme',
      avatar_url: 'https://github.com/guilhermesandi.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'Guilherme',
      avatar_url: 'https://github.com/guilhermesandi.png',
      status: 'offline'
    }
  ]

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      <ListHeader
        title="Jogadores"
        subtitle="Total 3"
      />

      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Member data={item} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon
          title="Entrar na partida"
        />
      </View>
    </Background>
  );
}