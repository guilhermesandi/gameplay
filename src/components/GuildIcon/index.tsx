import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCNWZAJTiIoIZX_8NTc6_FgFLmQF-gNxLK2A&usqp=CAU';

  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMode="cover"
    />
  )
}