import React from "react";
import * as PropTypes from "prop-types";
import * as routes from "app/routes";
import Back from "common/Back";
import SubscriptionSwitcher from "subscriptions/SubscriptionSwitcher";
import SelectedPlan from "insurance/insurancePlans/SelectedPlan";
import styles from "../Insurance/Insurance.module.css";
import { connect } from "react-redux";

class InsuranceConfirm extends React.Component {
  state = {
    activating: false
  };

  confirmContract = async () => {
    const { subId, onActivationSuccess, showInfoMessage } = this.props;
    this.setState({
      activating: true
    });
    const contract = await this.createContract();

    if (contract && contract.id) {
      const device = await this.createDevice(contract.id);
      if (device && device.id) {
        const activate = await this.activateContract(contract.id);
        if (activate === "success") {
          showInfoMessage(
            "general",
            "Congratulations! Your contract successfully created."
          );
          onActivationSuccess(subId);
        }
      }
    }
    /*
    Activate submit on error
    this.setState({
      activating: false
    });
     */
  };

  createContract = async () => {
    const { createInsuranceContract, subId, subscription } = this.props;
    try {
      return await createInsuranceContract({
        [subscription]: subId
      });
    } catch (err) {
      //show something on error
      return err;
    }
  };

  createDevice = async contract => {
    const { createInsuranceDevice, sku, insPlanId } = this.props;
    try {
      return await createInsuranceDevice({
        contract,
        device_specs: sku,
        plan_type: insPlanId
      });
    } catch (err) {
      //show something on error
      return err;
    }
  };

  activateContract = async id => {
    const { activateInsuranceContract } = this.props;
    try {
      return await activateInsuranceContract({ id });
    } catch (err) {
      //show something on error
      return err;
    }
  };

  render() {
    const {
      subId,
      sku,
      insPlanId,
      fetchInsurancePlan,
      subscription
    } = this.props;
    const { activating } = this.state;
    return (
      <div>
        <SubscriptionSwitcher
          {...(subscription === "att_subscription"
            ? { attSubId: subId }
            : { sprintSubId: subId })}
          attRoute={routes.attSubscription}
          sprintRoute={routes.sprintSubscription}
        />
        <div className={styles.Back}>
          <Back to={routes.attInsurancePlan(subId, sku)} />
        </div>
        <h1>Confirm an insurance plan</h1>
        <SelectedPlan
          insurancePlanId={insPlanId}
          findInsurancePlan={fetchInsurancePlan}
          onConfirm={this.confirmContract}
          activating={activating}
        />
      </div>
    );
  }
}

InsuranceConfirm.propTypes = {
  subId: PropTypes.any,
  insPlanId: PropTypes.any,
  subscription: PropTypes.string,
  fetchInsurancePlan: PropTypes.func,
  activateInsuranceContract: PropTypes.func,
  createInsuranceContract: PropTypes.func,
  createInsuranceDevice: PropTypes.func,
  showInfoMessage: PropTypes.func,
  onActivationSuccess: PropTypes.func
};

export default InsuranceConfirm;
