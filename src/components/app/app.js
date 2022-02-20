import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorIndicator from "../errror-indicator";
import ErrorButton from "../error-button/error-button";
import PeoplePage from "../people-page/people-page";
import ItemList from "../item-list";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";
import ItemDetails from "../item-details";

export default class App extends Component {
    swapiService = new SwapiService();

    state = {showRandomPlanet: true,
            hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        const { getPerson,
                getStarship,
                getPersonImage,
                getStarshipImage} = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageLink={getPersonImage}/>
        );

        const starShipDetails = (
            <ItemDetails
                itemId={11}
                getData={getStarship}
                getImageLink={getStarshipImage}/>
        );

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header />
                    <Row
                        left={personDetails}
                        right={starShipDetails}/>
                </div>
            </ErrorBoundry>


        );
    };
}


