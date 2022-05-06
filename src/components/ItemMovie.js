import { format } from 'date-fns';
import React, { memo } from 'react';
import {
	Text,
	View,
	Image,
	TouchableNativeFeedback,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { BASE_URL_IMAGE } from '../utils/apiHelper';

const ItemMovie = ({ data, onPress }) => {

	function showedDate(strDate) {
		try {
			let date = new Date(strDate);
			var formattedDate = format(date, "MMM dd, yyyy")
			return formattedDate;
		} catch (e) {
			return "Unknown";
		}
	}

	const ImageTv = () => {
		if (data.poster_path != null) {
			return (
				<SharedElement id={data.id}>
					<Image
						style={{ width: 120, height: 120, borderRadius: 15, marginRight: 15 }}
						source={{
							uri: `${BASE_URL_IMAGE}${data.poster_path}`
						}}
					/>
				</SharedElement>
			);
		} else {
			return (
				<SharedElement id={data.id}>
					<Image
						style={{ width: 120, height: 120, borderRadius: 15, marginRight: 15 }}
						source={
							require('../../assets/default_image.jpg')
						}
					/>
				</SharedElement>
			);
		}
	}

	return (
		<TouchableNativeFeedback
			onPress={() => {
				onPress();
			}}
		>
			<View>
				<View style={{ flexDirection: 'row', padding: 14, marginVertical: 10 }}>
					<ImageTv />
					<View style={{ justifyContent: 'space-between', flex: 1 }}>
						<View style={{ alignSelf: 'flex-start' }}>
							<Text style={{ fontSize: 20, color: 'black' }}>{data.original_name}</Text>
							<Text style={{ fontSize: 14, color: '#787878' }}>{showedDate(data.first_air_date)}</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Image
								style={{ width: 15, height: 15, marginRight: 10 }}
								source={
									require('../../assets/ic_like.png')
								}
							/>
							<Text style={{ fontSize: 14, color: '#787878' }}>{data.vote_average}</Text>
						</View>
					</View>
				</View>
				<View style={{ width: '100%', height: 1, marginHorizontal: 14, backgroundColor: '#EFEFEF' }} />
			</View>
		</TouchableNativeFeedback>

	);
}

export default memo(ItemMovie);
