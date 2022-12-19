import { H1, H2 } from '@expo/html-elements'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { User } from '../types'
import { getProfileImageUrl } from '../utils'

type CardProps = {
  profile: User
}

export function Card({ profile }: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <ImageBackground
          imageStyle={{ resizeMode: 'contain' }}
          source={{ uri: getProfileImageUrl(profile.id) }}
          style={styles.image}
        />
      </View>
      <View style={styles.details}>
        <H1 selectable={false}>{profile.name}</H1>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <H2 selectable={false}>{profile.age}</H2>
          <H2 selectable={false}>id: {profile.id}</H2>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    paddingTop: '1rem',
  },
  image: {
    flex: 1,
  },
  card: {
    height: '78vh',
    maxHeight: '38rem',
    width: '30rem',
    borderRadius: 20,
    backgroundColor: 'white',
    backgroundSize: '100% 92%',
    backgroundRepeat: 'no-repeat',
    boxShadow:
      '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
    touchAction: 'none',
  },
  details: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
    paddingHorizontal: '2rem',
  },
})
