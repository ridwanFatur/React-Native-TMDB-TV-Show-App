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
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const ItemShimmer = () => {
	return (
		<View>
			<View style={{ flexDirection: 'row', padding: 14, marginVertical: 10 }}>
				<ShimmerPlaceHolder
					LinearGradient={LinearGradient}
					style={{ width: 120, height: 120, borderRadius: 15, marginRight: 15 }}
				/>
				<View style={{ flex: 1 }}>
					<View>
						<ShimmerPlaceHolder
							LinearGradient={LinearGradient}
							style={{ width: "100%", height: 20, marginBottom: 10 }}
						/>
						<ShimmerPlaceHolder
							LinearGradient={LinearGradient}
							style={{ width: "100%", height: 14 }}
						/>
					</View>
				</View>
			</View>
			<View style={{ width: '100%', height: 1, marginHorizontal: 14, backgroundColor: '#EFEFEF' }} />
		</View>
	);
}

export default ItemShimmer;
