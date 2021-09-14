import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/core';
import { Fontisto } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  ImageBackground,
  Text,
  View,
  Alert,
  FlatList
} from 'react-native';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { styles } from './styles';

import { AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Member, MemberProps } from '../../components/Member';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}


export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

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
      {
        loading ? <Load /> :
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />

            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
      }

      <View style={styles.footer}>
        <ButtonIcon
          title="Entrar na partida"
        />
      </View>
    </Background>
  );
}