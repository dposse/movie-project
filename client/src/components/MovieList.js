import React, { Component } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";

class MovieList extends Component {  
  constructor() {
    super();

    this.state = {
      hasMoreItems: true
    };

    this.loadItems = this.loadItems.bind(this);
  }

  loadItems(page) {
    if (page < this.props.totalPages || this.props.totalPages === 0) {
      this.props.fetchMovies(page);
    } else {
      this.setState({ hasMoreItems: false });
    }
  }

  render() {
    if (this.props.order === undefined || this.props.movies === undefined) {
      return (
        <div>Loading...</div>
      )
    }

    const movies = this.props.order.map(m => {
      const movie = this.props.movies[m]
      return <Movie id={movie.id} key={movie.id} title={movie.title} img={movie.poster_path} />
    })

    return (
      <InfiniteScroll
        loadMore={this.loadItems}
        hasMore={this.state.hasMoreItems}
      >
        <MovieGrid>
          {movies}
        </MovieGrid>
      </InfiniteScroll> 
    );
  }
}

function mapStateToProps (state) {
  return { 
    movies: state.movies, 
    order: state.movies_order,
    totalPages: state.total_pages 
  }
};

export default connect(
  mapStateToProps,
  actions
)(MovieList);

const MovieGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;