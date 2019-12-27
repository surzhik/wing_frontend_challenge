import React from "react";
import * as PropTypes from "prop-types";
import styles from "./InsurancePlan.module.css";

const PlanBox = ({ plan, index, onSelect }) => {

  return (
    <div className={styles.planBox}>
      {index === 1 && <div className={styles.star} />}
      <div className={styles.firstPart}>
        <div>
          <h4>{plan.name}</h4>
        </div>
        <div>
          <div>Starting at</div>
          <div className={styles.planPrice}>${plan.price}</div>
        </div>
        <div>
          <div>Terms, fees and more info</div>
          <button
            className={index === 1 ? "active" : ""}
            onClick={onSelect}
            data-id={plan.id}
          >
            Select
          </button>
        </div>
      </div>
      <div className={styles.secondPart}>
        <div>
          {plan.protect_against && (
            <>
              Protect your device against
              <ul>
                {plan.protect_against.map(item => (
                  <li key={item.replace(/\s/g, "")}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div>
          <div>Repair deductible: ${plan.repair_deductible}</div>
          <div>Replacement deductible: ${plan.replacement_deductible}</div>
        </div>
      </div>
    </div>
  );
};

PlanBox.propTypes = {
  plan: PropTypes.object,
  index: PropTypes.number,
  onSelect: PropTypes.func
};

PlanBox.defaultProps = {
  index: 0,
  onSelect: () => {},
  plan: {
    name: "{name} is empty",
    price: "{price} is empty",
    repair_deductible: "{repair_deductible} is empty",
    replacement_deductible: "{replacement_deductible} is empty",
    protect_against: ["{protect_against} is empty"]
  }
};

export default PlanBox;
