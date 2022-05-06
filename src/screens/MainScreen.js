import axios from 'axios';
import React from 'react';
import {
	Text,
	View,
	Image,
	Button,
	TextInput,
	ScrollView,
	FlatList,
} from 'react-native';
import ItemMovie from '../components/ItemMovie';
import { API_KEY, BASE_URL, POPULAR_TV_SHOW_URL, SEARCH_TV_SHOW_URL } from '../utils/apiHelper';
import ItemShimmer from '../components/ItemShimmer';
import { debounce } from 'lodash';

class MainScreen extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			totalPage: 1,
			query: '',
			data: [],
			firstLoad: {
				isError: false,
				errorMessage: '',
				isLoading: true,
			},
			pagination: {
				isError: false,
				errorMessage: '',
				isLoading: false,
			}
		}
	}

	componentDidMount() {
		this.loadFirstData = debounce(this.loadFirstData, 500);
		this.loadPagination = debounce(this.loadPagination, 500);
		this.loadFirstData();
	}

	loadFirstData() {
		this.setState({
			page: 1,
			totalPage: 1,
			data: [],
			firstLoad: {
				isError: false,
				errorMessage: '',
				isLoading: true,
			},
			pagination: {
				isError: false,
				errorMessage: '',
				isLoading: false,
			}
		});

		if (this.state.query == "") {
			axios.get(
				`${BASE_URL}${POPULAR_TV_SHOW_URL}`, {
				params: {
					page: 1,
					api_key: API_KEY,
				}
			}).then((response) => {
				if (response.status == 200) {
					this.setState({
						data: response.data.results,
						totalPage: response.data.total_pages,
						firstLoad: {
							isError: false,
							errorMessage: '',
							isLoading: false,
						},
					});
				} else {
					this.setState({
						firstLoad: {
							isError: true,
							errorMessage: `Error: ${response.status}`,
							isLoading: false,
						},
					});
				}
			}).catch((error) => {
				this.setState({
					firstLoad: {
						isError: true,
						errorMessage: `Error: ${error}`,
						isLoading: false,
					},
				});
			});
		} else {
			axios.get(
				`${BASE_URL}${SEARCH_TV_SHOW_URL}`, {
				params: {
					page: 1,
					api_key: API_KEY,
					query: this.state.query,
				}
			}).then((response) => {
				if (response.status == 200) {
					this.setState({
						data: response.data.results,
						totalPage: response.data.total_pages,
						firstLoad: {
							isError: false,
							errorMessage: '',
							isLoading: false,
						},
					});
				} else {
					this.setState({
						firstLoad: {
							isError: true,
							errorMessage: `Error: ${response.status}`,
							isLoading: false,
						},
					});
				}

			}).catch((error) => {
				this.setState({
					firstLoad: {
						isError: true,
						errorMessage: `Error: ${error}`,
						isLoading: false,
					},
				});
			});
		}
	}

	loadPagination() {
		this.setState({
			pagination: {
				isError: false,
				errorMessage: '',
				isLoading: true,
			}
		});
		if (this.state.query == "") {
			axios.get(
				`${BASE_URL}${POPULAR_TV_SHOW_URL}`, {
				params: {
					page: this.state.page,
					api_key: API_KEY,
				}
			}).then((response) => {
				if (response.status == 200) {
					let currentList = this.state.data;
					this.setState({
						data: [...currentList, ...response.data.results],
						pagination: {
							isError: false,
							errorMessage: '',
							isLoading: false,
						},
					});
				} else {
					this.setState({
						pagination: {
							isError: true,
							errorMessage: `Error: ${response.status}`,
							isLoading: false,
						},
					});
				}

			}).catch((error) => {
				this.setState({
					pagination: {
						isError: true,
						errorMessage: `Error: ${error}`,
						isLoading: false,
					},
				});
			});
		} else {
			axios.get(
				`${BASE_URL}${SEARCH_TV_SHOW_URL}`, {
				params: {
					page: this.state.page,
					api_key: API_KEY,
					query: this.state.query,
				}
			}).then((response) => {
				if (response.status == 200) {
					let currentList = this.state.data;
					this.setState({
						data: [...currentList, ...response.data.results],
						pagination: {
							isError: false,
							errorMessage: '',
							isLoading: false,
						},
					});
				} else {
					this.setState({
						pagination: {
							isError: true,
							errorMessage: `Error: ${response.status}`,
							isLoading: false,
						},
					});
				}

			}).catch((error) => {
				this.setState({
					pagination: {
						isError: true,
						errorMessage: `Error: ${error}`,
						isLoading: false,
					},
				});
			});
		}
	}

	isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
		return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
	}

	footerListItem = () => {
		if (this.state.page < this.state.totalPage && !this.state.pagination.isError) {
			return (
				<View style={{ marginTop: 10 }}>
					<ItemShimmer />
				</View>
			);
		}
		else if (this.state.pagination.isError) {
			return (
				<View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
					<Button
						title='Retry'
						onPress={() => {
							this.loadPagination();
						}}
					/>
					<Text style={{ marginTop: 10 }}>{this.state.pagination.errorMessage}</Text>
				</View>
			);
		}
		else {
			return (<View />);
		}
	}

	DataList = () => {
		if (this.state.data.length == 0) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image style={{ width: 100, height: 100, marginBottom: 10 }} source={require("../../assets/ic_no_found_result.png")} />
					<Text>No Result</Text>
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1 }}>
					<FlatList
						data={this.state.data}
						initialNumToRender={3}
						renderItem={({ item }) => {
							return (
								<ItemMovie
									data={item}
									onPress={() => {
										this.props.navigation.navigate('Detail', {
											data: item,
										});
									}}
								/>
							);
						}}
						keyExtractor={item => item.id}
						ListFooterComponent={this.footerListItem}
						onScroll={({ nativeEvent }) => {
							if (this.isCloseToBottom(nativeEvent)) {
								if (this.state.page < this.state.totalPage && !this.state.pagination.isError && !this.state.pagination.isLoading) {
									let currentPage = this.state.page + 1;
									this.setState({
										page: currentPage,
										pagination: {
											isError: false,
											errorMessage: '',
											isLoading: true,
										}
									}, () => {
										this.loadPagination();
										console.log(`Load ${this.state.page}`);
									});
								}
							}
						}}
					/>
				</View>
			);
		}
	}

	render() {
		return (
			<View style={{ backgroundColor: 'white', flex: 1 }}>
				<View style={{
					paddingHorizontal: 20,
					paddingTop: 20,
					paddingBottom: 10,
					shadowOffset: { width: 1, height: 1 },
					shadowColor: 'black',
					shadowOpacity: 1,
					backgroundColor: "white",
					elevation: 10,
					overflow: 'visible',
				}}>
					<Text style={{ fontSize: 24, color: 'black', alignSelf: 'center', marginBottom: 10 }}>TV Show</Text>
					<TextInput placeholder='Search TV Show' style={{ backgroundColor: '#EFEFEF', paddingHorizontal: 10, borderRadius: 10 }}
						returnKeyType='search'
						onChangeText={(query) => {
							this.setState({
								query: query,
							}, () => {
								this.loadFirstData();
							});
						}}
					/>
				</View>

				<View style={{ flex: 1 }}>
					{
						this.state.firstLoad.isLoading
							?
							<ScrollView>
								<View>
									<ItemShimmer />
									<ItemShimmer />
									<ItemShimmer />
									<ItemShimmer />
								</View>
							</ScrollView>
							: this.state.firstLoad.isError
								? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
									<Button
										title='Retry'
										onPress={() => {
											this.loadFirstData();
										}}
									/>
									<Text style={{ marginTop: 10 }}>{this.state.firstLoad.errorMessage}</Text>
								</View>
								: <this.DataList />
					}
				</View>
			</View>
		);
	}
}

export default MainScreen;