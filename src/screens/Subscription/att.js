import { connect } from "react-redux";
import * as routes from "app/routes";

import Subscription from "./Subscription";
import { fetchFiltered as fetchFilteredContracts } from "insurance/insuranceContracts/actions";
import { getAttSubscription, getFilteredInsuranceContracts } from "reducers";

const mapStateToProps = (state, ownProps) => {
  const attSub = getAttSubscription(state, ownProps.subId);

  const filteredContracts = getFilteredInsuranceContracts(state, {
    att_subscription: ownProps.subId
  });

  return {
    subActive: attSub && attSub.att_status === "active",
    contracts: filteredContracts,
    sku: attSub && attSub.device_specs,
    navigateInsurancePlan: routes.attInsurancePlan,
    navigateInsurance: routes.attInsurance,
    subscription: 'att_subscription'
  };
};

const mapDispatchToProps = {
  fetchFilteredContracts
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
