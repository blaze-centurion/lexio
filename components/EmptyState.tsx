import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const EmptyState = ({title, subtitle}: {title: string, subtitle:string}) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image
          source={images.empty}
          resizeMode='contain'
          className='w-[270px] h-[215px]'
        />
        <Text className='text-xl text-center font-psemibold text-primary-black'>{title}</Text>
        <Text className='font-pmedium text-md text-secondary-black'>{subtitle}</Text>
    </View>
  )
}

export default EmptyState