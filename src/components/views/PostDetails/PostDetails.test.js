import React from 'react';
import { shallow } from 'enzyme';
import { PostDetailsComponent } from './PostDetails';

describe('Component PostDetails', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostDetailsComponent />);
    expect(component).toBeTruthy();
  });
});
