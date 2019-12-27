import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";
import Subscription from "./Subscription";
import SubscriptionSwitcher from "subscriptions/SubscriptionSwitcher";
import Box from "common/Box";
const mockStore = configureMockStore();

describe("Subscription", () => {
  const props = {
    subActive: true,
    contracts: [{ id: 50 }],
    sku: "SOME",
    navigateInsurancePlan: jest.fn(),
    navigateInsurance: jest.fn(),
    fetchFilteredContracts: jest.fn()
  };

  describe("Subscription structure", () => {
    it("have unchanged structure", () => {
      const store = mockStore({});
      const wrapper = shallow(
        <Provider store={store}>
          <Subscription {...props} />
        </Provider>
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });

  const subscription = shallow(<Subscription {...props} />);
  it("should render", () => {
    expect(subscription).toHaveLength(1);
  });

  it("should have selector", () => {
    expect(subscription.find(SubscriptionSwitcher)).toHaveLength(1);
  });
  it("should have 1 boxes with current props", () => {
    expect(subscription.find(Box)).toHaveLength(1);
  });
});
