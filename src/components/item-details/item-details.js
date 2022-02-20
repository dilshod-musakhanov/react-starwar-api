import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label} </span>
            <span>{field}</span>
        </li>
    );
}
export {
    Record
};


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
                        { this.props.children }
                    </ul>
                <ErrorButton />
                </div>
            </div>
        )
    }
}