// js/operator.js - Operator and Admin shared logic
const Operator = {
  updateRequestStatus: async function(requestId, status) {
    await State.updateRequestStatus(requestId, status);
  }
};
