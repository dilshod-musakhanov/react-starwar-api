import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import ItemDetails,{ Record } from "../item-details";
import ItemList from "../item-list";

import './app.css';

import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw-components';

export default class App extends Component {
    swapiService = new SwapiService();

    state = {showRandomPlanet: true
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    render() {

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        const { getPerson,
                getStarship,
                getPersonImage,
                getStarshipImage,
                getAllPeople,
                getAllPlanets } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageLink={getPersonImage}>

                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>

        );

        const starShipDetails = (
            <ItemDetails
                itemId={10}
                getData={getStarship}
                getImageLink={getStarshipImage}>

                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="manufacturer" label="Manufacturer" />
            </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header />

                    <PersonDetails itemId={11} />

                    <PlanetDetails itemId={10} />

                    <StarshipDetails itemId={10} />

                    <PersonList />

                    <StarshipList />

                    <PlanetList />

                </div>
            </ErrorBoundry>
        );
    };
}


