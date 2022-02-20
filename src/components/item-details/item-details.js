import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    updateItem() {
        const {itemId, getData, getImageLink} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageLink(item)
                })
            });
    }

    render() {

        const { item, image } = this.state
        if (!this.state.item) {
            return <Spinner />;
        }

        const { id, name, gender,
            birthYear, eyeColor, height } = item;

        return (
            <div className="item-details card">

                <img className="item-image"
                     src={image}
                     alt="item" />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender: </span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year: </span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color: </span>
                            <span>{eyeColor}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Height: </span>
                            <span>{height}</span>
                        </li>
                    </ul>
                <ErrorButton />
                </div>
            </div>
        )
    }
}