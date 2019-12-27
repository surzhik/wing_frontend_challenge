import { connect } from "react-redux";
import * as routes from "app/routes";
import { fetchValue as fetchInsurancePlans } from "insurance/insurancePlans/actions";
import { getInsurancePlans } from "reducers";
import InsurancePlan from "./InsurancePlan";

const mapStateToProps = state => {
  const insurancePlans = getInsurancePlans(state, ["WEW", "WDPP5P", "WDP3P"]);
  return {
    insurancePlans,
    navigateSubscription: routes.attSubscription,
    subscription: "att_subscription"
  };
};

const mapDispatchToProps = {
  fetchInsurancePlans,
  onSelectClick: routes.attInsuranceConfirm
};

export default connect(mapStateToProps, mapDispatchToProps)(InsurancePlan);
