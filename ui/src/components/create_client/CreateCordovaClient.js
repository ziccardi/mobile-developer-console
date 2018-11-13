import { connect } from 'react-redux';
import EditMobileClientBaseClass from './EditMobileClientBaseClass';
import { PLATFORM_CORDOVA } from './Constants';
import { setStatus, setFieldValue } from '../../actions/apps';

export const EXAMPLE_APPIDENTIFIER = 'org.aerogear.cordova.myapp';

/**
 * Component for the Cordova specific create mobile client form.
 */
class CreateCordovaClient extends EditMobileClientBaseClass {
  constructor(props) {
    super(PLATFORM_CORDOVA, props);
    this.config.appIdentifier.example = EXAMPLE_APPIDENTIFIER;
  }
}

function mapStateToProps(state) {
  return {
    ui: state.apps.createClientAppDialog
  };
}

const mapDispatchToProps = {
  setStatus,
  setFieldValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCordovaClient);
