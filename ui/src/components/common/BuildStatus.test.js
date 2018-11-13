/* eslint guard-for-in: 0 */

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import BuildStatus from './BuildStatus';

Enzyme.configure({ adapter: new Adapter() });
describe('BuildStatus', () => {
  it('test success', () => {
    const statusIconMapping = {
      Complete: '.fa-check-circle',
      Failed: '.fa-times-circle',
      Cancelled: '.fa-ban',
      Completed: '.fa-check',
      Active: '.fa-refresh',
      Error: '.fa-times',
      New: '.fa-hourglass-o',
      Pending: '.fa-hourglass-half',
      Ready: '.fa-check',
      Running: '.fa-refresh',
      Succeeded: '.text-success'
    };
    for (const key in statusIconMapping) {
      const status = { status: { phase: key } };
      const wrapper = shallow(<BuildStatus build={status} />);
      expect(wrapper.find(statusIconMapping[key])).toHaveLength(1);
    }
  });
});
