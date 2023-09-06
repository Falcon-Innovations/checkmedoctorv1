import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Button} from 'react-native-paper'
import {useAuthContext} from '../../contexts/authContext'
import {clearStorage} from '../../utils/storage'

const Home = () => {
  const {dispatch} = useAuthContext()
  const logout = () => {
    clearStorage()
    dispatch({type: 'SIGN_OUT'})
  }

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})