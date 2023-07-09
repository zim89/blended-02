import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    total: 0,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchData(query, page);
    }
  }

  fetchData = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      this.setState(prevState => ({
        total: total_results,
        images: [...prevState.images, ...photos],
      }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = value => {
    this.setState({ query: value });
  };
  render() {
    console.log(this.state.images);
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
