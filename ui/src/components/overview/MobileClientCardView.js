import React, { Component } from 'react';
import { Toolbar, Filter, FormControl, EmptyState, EmptyStateTitle, EmptyStateAction, CardGrid } from 'patternfly-react';
import './MobileClientCardView.css';
import MobileClientCardViewItem from './MobileClientCardViewItem';
import CreateClient from '../../containers/CreateClient';


const mockServices = [
  {type: 'metrics'}, {type:'keycloak'}, {type: 'sync'}, {type: 'push'}
];

const mockBuilds = [
  {status: "success"}, {status: "failed"}, {status: "success"}, {status: "failed"}
];

class MobileClientCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {filter: "", currentValue: ""};
  }

  setFilter(filterValue) {
    this.setState({filter: filterValue});
  }

  updateCurrentValue(event) {
    this.setState({ currentValue: event.target.value });
  }

  onValueKeyPress(keyEvent) {
    const { currentValue } = this.state;
    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      this.setState({ currentValue: '' });
      this.setFilter(currentValue);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  }

  removeFilter(filter) {
    this.setState({filter: ""});
  }

  getEmptyState() {
    return (
      <EmptyState>
        <EmptyStateTitle>
          You have no mobile apps right now. Create one to get started.
        </EmptyStateTitle>
        <EmptyStateAction>
          <CreateClient createButtonSize="large" />
        </EmptyStateAction>
      </EmptyState>
    )
  }

  renderAppCards() {
    const {mobileClients} = this.props;
    return (
      <CardGrid matchHeight fluid>
        <CardGrid.Row key={1}>
        { mobileClients.map((app, i) => (
            <MobileClientCardViewItem key={i} app={app} services={mockServices} builds={mockBuilds} />
          )) }
        </CardGrid.Row>
      </CardGrid>
    )
  }

  render() {
    const {mobileClients} = this.props;
    const {filter, currentValue} = this.state;
    return (
      <div>
      <Toolbar>
        <Filter>
          <FormControl 
            type="text" 
            placeholder="Filter by name"
            value={currentValue}
            onChange={e => this.updateCurrentValue(e)}
            onKeyPress={e => this.onValueKeyPress(e)}
          ></FormControl>
        </Filter>
        <div className="form-group">
          <CreateClient />
        </div>
        {filter && filter.length > 0 && (
          <Toolbar.Results>
            <Filter.ActiveLabel>{'Active Filters:'}</Filter.ActiveLabel>
            <Filter.List>
              <Filter.Item key="1" filterData={{filter}} onRemove={this.removeFilter.bind(this)}>{filter}</Filter.Item>
            </Filter.List>
          </Toolbar.Results>
        )}
      </Toolbar>
      {mobileClients.length ? this.renderAppCards() : this.getEmptyState()}  
      </div>
    )
  }
}

export default MobileClientCardView;