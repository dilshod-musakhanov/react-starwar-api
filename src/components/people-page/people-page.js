import React, {Component} from "react";
import "./people-page.css";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../errror-indicator";
import SwapiService from "../../services/swapi-service";


const Row = ({left, right}) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    )
}

export default class PeoplePage extends Component {
    swapiService = new SwapiService();
    state = {
        selectedPerson: 1,
        hasError: false
    }
    componentDidCatch() {
        this.setState({hasError: true});
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
            getData={this.swapiService.getAllPeople}
            renderItem={(item) => `${item.name}, (${item.gender}, ${item.birthYear})`}
        />
    )
    const personDetails = (
        <PersonDetails personId={this.state.selectedPerson} />
    )
        return (
            <div>
                <Row left={itemList} right={personDetails}/>
                <Row left={itemList} right={personDetails}/>
                <Row left="Good Forces" right="Evil Forces"/>
            </div>
        )
    }


}