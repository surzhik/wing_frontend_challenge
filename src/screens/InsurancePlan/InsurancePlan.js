import React from "react";
import * as PropTypes from "prop-types";
import * as routes from "app/routes";
import Back from "common/Back";
import SubscriptionSwitcher from "subscriptions/SubscriptionSwitcher";
import PlanBox from "./PlanBox";
import styles from "./InsurancePlan.module.css";

class insurancePlan extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let { fetchInsurancePlans } = this.props;
    fetchInsurancePlans("all");
  };

  doConfirm = event => {
    const { sku, subId, onSelectClick } = this.props;
    event.preventDefault();
    const insPlanId = event.target.getAttribute("data-id");
    onSelectClick(subId, sku, insPlanId);
  };
  render() {
    let {
      subId,
      insurancePlans,
      subscription,
      navigateSubscription
    } = this.props;
    return (
      <div>
        <SubscriptionSwitcher
          {...(subscription === "att_subscription"
            ? { attSubId: subId }
            : { sprintSubId: subId })}
          attRoute={navigateSubscription}
          sprintRoute={routes.sprintSubscription}
        />
        <div className={styles.Back}>
          <Back to={navigateSubscription(subId)} />
        </div>
        <h1>Select an insurance plan</h1>
        <div className={styles.plansHolder}>
          {insurancePlans.map((plan, index) => (
            <PlanBox
              key={plan.id}
              plan={plan}
              index={index}
              onSelect={this.doConfirm}
            />
          ))}
        </div>
      </div>
    );
  }
}

insurancePlan.propTypes = {
  subId: PropTypes.any,
  fetchInsurancePlans: PropTypes.func,
  onSelectClick: PropTypes.func,
  navigateSubscription: PropTypes.func,
  insurancePlans: PropTypes.array,
  sku: PropTypes.string
};

export default insurancePlan;
