import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";
import InsurancePlan from "./InsurancePlan";
import SubscriptionSwitcher from "subscriptions/SubscriptionSwitcher";
import PlanBox from "./PlanBox";
const mockStore = configureMockStore();

describe("Insurance Plan", () => {
  const props = {
    insurancePlans: [{ id: 1 }, { id: 2 }, { id: 3 }],
    navigateSubscription: jest.fn(),
    subscription: "subscription",
    fetchInsurancePlans: jest.fn(),
    onSelectClick: jest.fn()
  };

  describe("Insurance Plan structure", () => {
    it("have unchanged structure", () => {
      const store = mockStore({});
      const wrapper = shallow(
        <Provider store={store}>
          <InsurancePlan {...props} />
        </Provider>
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });

  const subscription = shallow(<InsurancePlan {...props} />);
  it("should render", () => {
    expect(subscription).toHaveLength(1);
  });

  it("should have selector", () => {
    expect(subscription.find(SubscriptionSwitcher)).toHaveLength(1);
  });
  it("should have 3 plans current props", () => {
    expect(subscription.find(PlanBox)).toHaveLength(3);
  });
});
