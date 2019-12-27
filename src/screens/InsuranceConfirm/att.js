import { connect } from "react-redux";
import * as routes from "app/routes";
import InsuranceConfirm from "./InsuranceConfirm";
import { find as fetchInsurancePlan } from "insurance/insurancePlans/actions";
import {
  createContract as createInsuranceContract,
  activateContract as activateInsuranceContract
} from "insurance/insuranceContracts/actions";
import { createDevice as createInsuranceDevice } from "insurance/insuredDevices/actions";
import { info as showInfoMessage } from "notifications/actions";

const mapStateToProps = state => ({
  subscription: "att_subscription"
});

const mapDispatchToProps = {
  fetchInsurancePlan,
  activateInsuranceContract,
  createInsuranceContract,
  createInsuranceDevice,
  showInfoMessage,
  onActivationSuccess: routes.attSubscription
};

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceConfirm);
