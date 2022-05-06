import axios from 'axios';
import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	Button,
	FlatList,
	StatusBar,
	TouchableNativeFeedback,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import ItemSeason from '../components/ItemSeason';
import ItemShimmer from '../components/ItemShimmer';
import { API_KEY, BASE_URL, BASE_URL_IMAGE, DETAIL_TV_SHOW_URL } from '../utils/apiHelper';

class DetailScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadDetail: {
				isError: false,
				errorMessage: '',
				isLoading: true,
			},
			detailData: {},
		}
	}

	componentDidMount() {
		this.loadTVShowDetail();
	}

	loadTVShowDetail() {
		const { data } = this.props.route.params;

		this.setState({
			loadDetail: {
				isError: false,
				errorMessage: '',
				isLoading: true,
			},
		});

		axios.get(
			`${BASE_URL}${DETAIL_TV_SHOW_URL}/${data.id}`, {
			params: {
				api_key: API_KEY,
			}
		}).then((response) => {
			if (response.status == 200) {
				this.setState({
					loadDetail: {
						isError: false,
						errorMessage: '',
						isLoading: false,
					},
					detailData: response.data,
				});
			} else {
				this.setState({
					loadDetail: {
						isError: true,
						errorMessage: `Error: ${response.status}`,
						isLoading: false,
					},
				});
			}

		}).catch((error) => {
			this.setState({
				loadDetail: {
					isError: true,
					errorMessage: `Error: ${error}`,
					isLoading: false,
				},
			});
		});
	}

	headerDetail = () => {
		const { data } = this.props.route.params;
		return (
			<View>
				<ImageBackdropTvShow data={data} onPress={() => {
					this.props.navigation.goBack();
				}} />
				<View style={{ flexDirection: 'row' }}>
					<View style={{ marginTop: -40 }}>
						<ImagePosterTvShow data={data} />
					</View>
					<View style={{ flex: 1, padding: 14 }}>
						<View style={{ alignSelf: 'flex-start' }}>
							<Text style={{ fontSize: 25, color: 'black', marginBottom: 10, fontWeight: 'bold' }}>{data.original_name}</Text>
							<Text style={{ fontSize: 14, color: '#787878', textAlign: 'justify' }}>{data.overview ?? ''}</Text>
						</View>
					</View>
				</View>
				<Text style={{ fontSize: 20, color: 'black', padding: 14, marginTop: 10 }}>Seasons</Text>
				{
					this.state.loadDetail.isLoading
						? <ItemShimmer />
						: this.state.loadDetail.isError
							? <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
								<Button
									title='Retry'
									onPress={() => {
										this.loadTVShowDetail();
									}}
								/>
								<Text style={{ marginTop: 10 }}>{this.state.loadDetail.errorMessage}</Text>
							</View>
							: <View />

				}
			</View>
		);
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<StatusBar translucent backgroundColor="transparent" />
				<FlatList
					data={this.state.detailData.seasons}
					renderItem={({ item }) => {
						return (
							<ItemSeason
								data={item}
							/>
						);
					}}
					keyExtractor={item => item.id}
					ListHeaderComponent={this.headerDetail}
				/>
			</View>
		);
	}
}

const ImageBackdropTvShow = ({ data, onPress }) => {
	if (data.backdrop_path != null) {
		return (
			<View>
				<Image
					style={{ width: '100%', height: 350 }}
					source={{
						uri: `${BASE_URL_IMAGE}${data.backdrop_path}`
					}}
				/>
				<View style={{ position: 'absolute', top: StatusBar.currentHeight + 10, left: 10, }}>
					<TouchableNativeFeedback onPress={() => {
						onPress();
					}}>
						<Image
							style={{ width: 30, height: 30, margin: 10 }}
							source={
								require('../../assets/ic_back.png')
							}
						/>
					</TouchableNativeFeedback>
				</View>
			</View>
		);
	} else {
		return (
			<View>
				<Image
					style={{ width: '100%', height: 350 }}
					source={
						require('../../assets/default_image.jpg')
					}
				/>
				<View style={{ position: 'absolute', top: StatusBar.currentHeight + 10, left: 10, }}>
					<TouchableNativeFeedback onPress={() => {
						onPress();
					}}>
						<Image
							style={{ width: 30, height: 30, margin: 10 }}
							source={
								require('../../assets/ic_back.png')
							}
						/>
					</TouchableNativeFeedback>
				</View>
			</View>
		);
	}
}

const ImagePosterTvShow = ({ data }) => {
	if (data.poster_path != null) {
		return (
			<SharedElement id={data.id}>
				<View style={{
					shadowOffset: { width: 1, height: 1 },
					shadowColor: 'black',
					shadowOpacity: 1,
					backgroundColor: "white",
					borderRadius: 20,
					elevation: 10,
					margin: 10,
					overflow: 'visible',
				}}>
					<Image
						style={{
							width: 140, height: 210, borderRadius: 20,
						}}
						source={{
							uri: `${BASE_URL_IMAGE}${data.poster_path}`
						}}
					/>
				</View>
			</SharedElement>
		);
	} else {
		return (
			<SharedElement id={data.id}>
				<View style={{
					shadowOffset: { width: 1, height: 1 },
					shadowColor: 'black',
					shadowOpacity: 1,
					backgroundColor: "white",
					borderRadius: 20,
					margin: 10,
					elevation: 10,
					overflow: 'visible',
				}}>
					<Image
						style={{ width: 140, height: 210, borderRadius: 20 }}
						source={
							require('../../assets/default_image.jpg')
						}
					/>
				</View>
			</SharedElement>
		);
	}
}

DetailScreen.sharedElements = route => {
	const { data } = route.params;
	return [
		{
			id: data.id,
			animation: 'move',
			resize: 'clip'
		}
	];
}

export default DetailScreen;