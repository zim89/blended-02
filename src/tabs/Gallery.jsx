import { Component } from 'react';
import { MdFrontLoader } from 'react-icons/md';
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
    this.setState({
      query: value,
      images: [],
      page: 1,
      total: 0,
      error: null,
      isLoading: false,
    });
  };

  handleLoadMoreClick = event => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    console.log(this.state.images);
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {this.state.error && (
          <Text textAlign="center">Sorry. There is some error ... 🥵</Text>
        )}

        {this.state.images.length === 0 &&
          this.state.query !== '' &&
          !this.state.isLoading && (
            <Text textAlign="center">Sorry. There is no any image ... 🤐</Text>
          )}

        {this.state.isLoading && <MdFrontLoader />}

        <Grid>
          {' '}
          {/*ul*/}
          {this.state.images.map(({ id, avg_color, src, alt }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src?.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {this.state.query !== '' &&
          this.state.images.length !== 0 &&
          this.state.total > this.state.images.length && (
            <Button onClick={this.handleLoadMoreClick}>Load more</Button>
          )}
      </>
    );
  }
}
