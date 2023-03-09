// Inspired by Carlos's lecture

import React, { Component } from "react";
import AuthContext from "../utils/AuthContextProvider";
import {
    getBrews,
    getBeans,
    checkRating,
    postRating,
    updateRating,
    fetchRatings,
} from "../api/api";

function Main(WrappedComponent) {
  class BrewCompontent extends Component {
    static contextType = AuthContext;
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        brewStatus: {},
        coffeeBeans: [],
        rating: 0,
        avgRating: 0,
      };
      this.fetchData = this.fetchData.bind(this);
      this.setRating = this.setRating.bind(this);
    }

    componentDidMount() {
      this.setState({ loading: true });
      this.fetchData();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.UpdatedBrewStatus !== this.props.UpdatedBrewStatus) {
        this.fetchData();
      }
    }

    calcAvergareRating = (data) => {
      const arr = [];
      data.map((item) => arr.push(item.rating));
      this.setState({ avgRating: arr.reduce((a, b) => a + b) / arr.length });
    };

    fetchData = async () => {
      this.setState({ loading: true });
      
      await getBrews().then((response) => {
        this.setState({ brewStatus: response.data[0] });
      });

     
      await getBeans().then((response) => {
        this.setState({ coffeeBeans: [] });
        response.data.map((bean) =>
          this.setState((prevState) => ({
            coffeeBeans: [...prevState.coffeeBeans, bean.name],
          }))
        );
      });

      await fetchRatings(this.state.brewStatus._id).then((response) => {
        response.data.length !== 0 && this.calcAvergareRating(response.data);
      });

      this.setState({ loading: false });
    };

 
    setRating = async (rating) => {
      this.setState({ rating: rating });
      const newRating = async () => {
        await postRating(
          this.state.brewStatus._id,
          this.context.user.id,
          this.state.rating,
          this.state.brewStatus.brewName,
          this.state.brewStatus.grind,
          this.state.brewStatus.water,
          this.state.brewStatus.gram,
          this.state.brewStatus.createdAt
        );
      };

      await checkRating(this.context.user.id, this.state.brewStatus._id).then(
        (response) => {
          response.data.length === 0
            ? newRating()
            : updateRating(
                this.context.user.id,
                this.state.brewStatus._id,
                this.state.rating,
                this.state.brewStatus.brewName,
                this.state.brewStatus.grind,
                this.state.brewStatus.water,
                this.state.brewStatus.gram,
                this.state.brewStatus.createdAt
              );
        }
      );
    };

    render() {
      return (
        <>
          {!this.state.loading ? (
            <WrappedComponent
              {...this.state}
              handlePage={this.props.handlePage}
              setUpdatedBrewStatus={this.props.setUpdatedBrewStatus}
              setRating={this.setRating}
              fetchData={this.fetchData}
            />
          ) : (
            "Loading..."
          )}
        </>
      );
    }
  }

  return BrewCompontent;
}

export default Main;