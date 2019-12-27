import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";
import InsuranceConfirm from "./InsuranceConfirm";
import SubscriptionSwitcher from "subscriptions/SubscriptionSwitcher";
import SelectedPlan from "insurance/insurancePlans/SelectedPlan";
const mockStore = configureMockStore();

describe("Insurance Confirmation", () => {
  const props = {
    subscription: "subscription",
    fetchInsurancePlan: jest.fn(),
    activateInsuranceContract: jest.fn(),
    createInsuranceContract: jest.fn(),
    createInsuranceDevice: jest.fn(),
    showInfoMessage: jest.fn(),
    onActivationSuccess: jest.fn()
  };

  describe("Insurance Confirmation structure", () => {
    it("have unchanged structure", () => {
      const store = mockStore({});
      const wrapper = shallow(
        <Provider store={store}>
          <InsuranceConfirm {...props} />
        </Provider>
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });

  const subscription = shallow(<InsuranceConfirm {...props} />);
  it("should render", () => {
    expect(subscription).toHaveLength(1);
  });

  it("should have selector", () => {
    expect(subscription.find(SubscriptionSwitcher)).toHaveLength(1);
  });
  it("should have 1 boxes with current props", () => {
    expect(subscription.find(SelectedPlan)).toHaveLength(1);
  });
});
