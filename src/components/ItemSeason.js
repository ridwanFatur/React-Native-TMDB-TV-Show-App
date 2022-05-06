import axios from 'axios';
import { format } from 'date-fns';
import React, { memo } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	TextInput,
	Alert,
	ScrollView,
	TouchableNativeFeedback,
} from 'react-native';
import { BASE_URL_IMAGE } from '../utils/apiHelper';

const ItemSeason = ({ data }) => {

	function showedDate(strDate) {
		try {
			let date = new Date(strDate);
			var formattedDate = format(date, "yyyy")
			return formattedDate;
		} catch (e) {
			return "Unknown";
		}
	}

	const ImageTv = () => {
		if (data.poster_path != null) {
			return (
				<Image
					style={{ width: 100, height: 120, borderRadius: 15, marginRight: 15 }}
					source={{
						uri: `${BASE_URL_IMAGE}${data.poster_path}`
					}}
				/>
			);
		} else {
			return (
				<Image
					style={{ width: 100, height: 120, borderRadius: 15, marginRight: 15 }}
					source={
						require('../../assets/default_image.jpg')
					}
				/>
			);
		}
	}

	return (
		<View>
			<View style={{ flexDirection: 'row', padding: 14, marginVertical: 10 }}>
				<ImageTv />
				<View style={{ flex: 1 }}>
					<View style={{ alignSelf: 'flex-start' }}>
						<Text style={{ fontSize: 20, color: 'black' }}>{data.name}</Text>
						<Text style={{ fontSize: 14, color: '#787878', marginBottom: 10 }}>{showedDate(data.air_date)} | {data.episode_count} Episodes</Text>
						<Text style={{ fontSize: 14, color: 'black' , textAlign: 'justify'}}>{data.overview ?? ''}</Text>
					</View>
				</View>
			</View>
			<View style={{ width: '100%', height: 1, marginHorizontal: 14, backgroundColor: '#EFEFEF' }} />
		</View>
	);
}

export default memo(ItemSeason);
