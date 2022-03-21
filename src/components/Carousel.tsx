import React from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'

interface CarouselProps {
    idArr: number[],
}

const Carousel: React.FC<CarouselProps> = ({idArr}) => {
	
	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			horizontal
			data={idArr}
			renderItem={({item}) => {
				return(
					<Image
					style={styles.image}
					source={{uri:`https://photo.hotellook.com/image_v2/limit/${item}/800/520.auto`}}
				/>
				)

			}}
		/>

	)
}
export default Carousel

const styles = StyleSheet.create({
	image: {
		width: 140,
		height: 200,
		marginRight: 16,
		borderRadius: 10,
	}
})