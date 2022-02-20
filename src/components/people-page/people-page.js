import React, {Component} from "react";
import "./people-page.css";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../errror-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";

export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 1,
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson});
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>

                {(i) => (
                    `${i.name}`
                )}

            </ItemList>
        );

        const personDetails = (
                <ItemDetails personId={this.state.selectedPerson} />
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        );
    }
}