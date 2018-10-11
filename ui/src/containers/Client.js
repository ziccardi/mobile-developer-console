import React, { Component } from 'react';
import { Nav, NavItem, TabContent, TabPane, Tabs } from 'patternfly-react';
import { connect } from 'react-redux';
import ConfigurationView from '../components/configuration/ConfigurationView';
import MobileServiceView from '../components/mobileservices/MobileServiceView';
import { fetchBuildConfigs } from '../actions/buildConfigs';
import { fetchBuilds } from '../actions/builds';
import DataService from '../DataService';
import { MobileClientBuildOverviewList } from '../components/build/MobileClientBuildOverviewList';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buildConfigs: []
    };
  }

  componentDidMount() {
    this.props.fetchBuildConfigs();
    this.props.fetchBuilds();

    this.wsBuildConfigs = DataService.watchBuildConfigs(this.props.fetchBuildConfigs);
    this.wsBuilds = DataService.watchBuilds(this.props.fetchBuilds);
  }

  componentWillUnmount() {
    this.wsBuildConfigs.close();
    this.wsBuilds.close();
  }

  componentDidUpdate(prevProps) {
    if (this.props.buildConfigs !== prevProps.buildConfigs || this.props.builds !== prevProps.builds) {
      const configs = this.props.buildConfigs.items.filter(
        config => config.metadata.labels['mobile-client-id'] === this.props.match.params.id
      );

      configs.forEach(config => delete config.builds);

      this.props.builds.items.forEach(build => {
        const matchingConfig = configs.find(config => config.metadata.name === build.metadata.labels.buildconfig);
        if (matchingConfig) {
          matchingConfig.builds = matchingConfig.builds || [];
          matchingConfig.builds.push(build);
          this.setState({ matchingConfig });
        }
      });

      this.setState({ buildConfigs: configs });
    }
  }

  render() {
    const { pathname } = this.props.location;
    const clientId = pathname.substr(pathname.lastIndexOf('/') + 1);
    return (
      <div>
        <div>
          <Tabs id="basic-tabs-pf" defaultActiveKey={1}>
            <div>
              <Nav bsClass="nav nav-tabs nav-tabs-pf nav-justified">
                <NavItem eventKey={1}>Configuration</NavItem>
                <NavItem eventKey={2}>Builds</NavItem>
                <NavItem eventKey={3}>Mobile Services</NavItem>
              </Nav>
              <TabContent>
                <TabPane eventKey={1}>
                  <ConfigurationView />
                </TabPane>
                <TabPane eventKey={2}>
                  <MobileClientBuildOverviewList
                    appName={this.props.match.params.id}
                    buildConfigs={this.state.buildConfigs}
                  />
                </TabPane>
                <TabPane eventKey={3}>
                  <MobileServiceView />
                </TabPane>
              </TabContent>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    buildConfigs: state.buildConfigs,
    builds: state.builds
  };
}

const mapDispatchToProps = {
  fetchBuildConfigs,
  fetchBuilds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client);
