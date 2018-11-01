import React, { Component } from 'react';
import {
  Nav, NavItem, TabContent, TabPane, TabContainer, Grid, Breadcrumb, DropdownButton, Alert
} from 'patternfly-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfigurationView from '../components/configuration/ConfigurationView';
import MobileClientBuildsList from '../components/build/MobileClientBuildsList';
import MobileServiceView from '../components/mobileservices/MobileServiceView';
import { fetchApp } from '../actions/apps';
import { fetchBuildConfigs } from '../actions/buildConfigs';
import { fetchBuilds } from '../actions/builds';
import DataService from '../DataService';
import PlatformIcon from '../components/common/PlatformIcon';
import DeleteItemButton from './DeleteItemButton';

import './Client.css';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buildConfigs: [],
    };
  }

  componentDidMount() {
    const appName = this.props.match.params.id;

    this.props.fetchApp(appName);
    if (this.props.buildTabEnabled) {
      this.props.fetchBuildConfigs();
      this.props.fetchBuilds();

      this.wsBuildConfigs = DataService.watchBuildConfigs(this.props.fetchBuildConfigs);
      this.wsBuilds = DataService.watchBuilds(this.props.fetchBuilds);
    }
  }

  componentWillUnmount() {
    this.wsBuildConfigs && this.wsBuildConfigs.close();
    this.wsBuilds && this.wsBuilds.close();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.buildConfigs !== prevProps.buildConfigs
      || this.props.builds !== prevProps.builds
    ) {
      const configs = this.props.buildConfigs.items.filter(config => config.metadata.labels['mobile-client-id'] === this.props.match.params.id);

      configs.forEach(config => delete config.builds);

      this.props.builds.items.forEach((build) => {
        const matchingConfig = configs.find(
          config => config.metadata.name === build.metadata.labels.buildconfig,
        );
        if (matchingConfig) {
          matchingConfig.builds = matchingConfig.builds || [];
          matchingConfig.builds.push(build);
        }
      });

      this.setState({ buildConfigs: configs });
    }
  }

  header = app => (
    <div className="app-header-wrapper">
      <div className="app-header">
        <PlatformIcon small platform={app.spec.clientType} />
        <div>
          <span className="platform">{app.spec.clientType}</span>
          <h1>{app.spec.name}</h1>
        </div>
      </div>
      <div className="app-actions-dropdown">
        <DropdownButton id="app-actions-dropdown" title="Actions" pullRight onClick={() => {}}>
          <DeleteItemButton itemType="app" itemName={this.props.match.params.id} navigate="/" />
        </DropdownButton>
      </div>
    </div>
  );

  render() {
    const mobileApp = this.props.apps.items.find(app => app.metadata.name === this.props.match.params.id);

    return (
      <Grid fluid className="client-details">
        <Breadcrumb>
          <Breadcrumb.Item active>
            <Link to="/overview">Mobile Apps</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            { mobileApp.spec.name }
          </Breadcrumb.Item>
        </Breadcrumb>
        { mobileApp && this.header(mobileApp) }
        {
          this.props.apps.readingError ? (
            <Alert>{this.props.apps.readingError.message}</Alert>
          ) : (
            <TabContainer id="basic-tabs-pf" defaultActiveKey={1}>
              <div>
                <Nav bsClass="nav nav-tabs nav-tabs-pf nav-tabs-pf-secondary">
                  <NavItem eventKey={1}>Configuration</NavItem>
                  {this.props.buildTabEnabled ? (<NavItem eventKey={2}>Builds</NavItem>) : null }
                  <NavItem eventKey={3}>Mobile Services</NavItem>
                </Nav>
                <TabContent id="basic-tabs-content">
                  <TabPane eventKey={1}>
                    <ConfigurationView />
                  </TabPane>
                  {this.props.buildTabEnabled? 
                    (<TabPane eventKey={2}>
                      <MobileClientBuildsList appName={this.props.match.params.id} buildConfigs={this.state.buildConfigs} />
                    </TabPane>) : null
                  }
                  <TabPane eventKey={3}>
                    <MobileServiceView />
                  </TabPane>
                </TabContent>
              </div>
            </TabContainer>
          )
        }
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    apps: state.apps,
    buildConfigs: state.buildConfigs,
    builds: state.builds,
    buildTabEnabled: state.config.buildTabEnabled
  };
}

const mapDispatchToProps = {
  fetchApp,
  fetchBuildConfigs,
  fetchBuilds,
};

export default connect(mapStateToProps, mapDispatchToProps)(Client);
