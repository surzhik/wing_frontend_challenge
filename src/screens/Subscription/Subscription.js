import React from "react";
import SubscriptionSwitcher from "subscriptions/SubscriptionSwitcher";
import Box from "common/Box";
import Link from "common/Link";
import * as routes from "app/routes";
import add_green_circle from "common/img/add_green_circle.svg";
import styles from "./Subscription.module.css";
import * as PropTypes from "prop-types";

export class SubscriptionScreen extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(oldProps) {
    if (this.props.subId !== oldProps.subId) {
      this.fetchData();
    }
  }

  fetchData = () => {
    let { subId, fetchFilteredContracts, subscription } = this.props;
    fetchFilteredContracts({ [subscription]: subId });
  };

  render() {
    const {
      subId,
      contracts,
      subActive,
      sku,
      navigateInsurancePlan,
      navigateInsurance,
      subscription
    } = this.props;

    return (
      <div className="Subscription">
        <SubscriptionSwitcher
          {...(subscription === "att_subscription"
            ? { attSubId: subId }
            : { sprintSubId: subId })}
          attRoute={routes.attSubscription}
          sprintRoute={routes.sprintSubscription}
        />
        <div className={styles.linkList}>
          {!contracts ||
            (contracts.length === 0 && (
              <Link
                className={styles.subscriptionLink}
                to={navigateInsurance(subId)}
              >
                <Box>
                  <img src={add_green_circle} />
                  Insurance
                </Box>
              </Link>
            ))}
          {subActive && (
            <Link
              className={styles.subscriptionLink}
              to={navigateInsurancePlan(subId, sku)}
            >
              <Box>
                <img src={add_green_circle} />
                Select plan
              </Box>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

SubscriptionScreen.propTypes = {
  subId: PropTypes.any,
  contracts: PropTypes.array,
  subActive: PropTypes.bool,
  sku: PropTypes.string,
  fetchFilteredContracts: PropTypes.func,
  subscription: PropTypes.string,
  navigateInsurancePlan: PropTypes.func,
  navigateInsurance: PropTypes.func
};

export default SubscriptionScreen;
