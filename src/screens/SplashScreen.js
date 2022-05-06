import React, { useRef, useEffect } from 'react';
import {
	Text,
	View,
	Image,
	Button,
	FlatList,
	StatusBar,
	TouchableNativeFeedback,
	Animated,
} from 'react-native';

const SplashScreen = ({ navigation }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 300,
				useNativeDriver: true
			},
		).start();
		setTimeout(() => {
			navigation.replace("Main");
		}, 2000);
	}, [fadeAnim])

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Animated.View
				style={{
					opacity: fadeAnim,
				}}
			>
				<View>
					<Image
						style={{ width: 200, height: 200, marginBottom: 10 }}
						source={
							require('../../assets/logo_app.png')
						}
					/>
					<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>TV Show App</Text>
				</View>
			</Animated.View>
		</View>
	);
}

export default SplashScreen;