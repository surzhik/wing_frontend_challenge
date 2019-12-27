import { connect } from "react-redux";
import * as routes from "app/routes";
import { fetchFiltered as fetchFilteredContracts } from "insurance/insuranceContracts/actions";
import { getSprintSubscription, getFilteredInsuranceContracts } from "reducers";
import Subscription from "./Subscription";

const mapStateToProps = (state, ownProps) => {
  const sprintSub = getSprintSubscription(state, ownProps.subId);
  const filteredContracts = getFilteredInsuranceContracts(state, {
    subscription: ownProps.subId
  });

  return {
    subActive: sprintSub && sprintSub.sprint_status === "active",
    contracts: filteredContracts,
    sku: sprintSub && sprintSub.device_specs,
    navigateInsurancePlan: routes.sprintInsurancePlan,
    navigateInsurance: routes.sprintInsurance,
    subscription: "subscription"
  };
};

const mapDispatchToProps = {
  fetchFilteredContracts
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
