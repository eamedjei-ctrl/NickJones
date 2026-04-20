// js/operator.js - Operator and Admin shared logic
const Operator = {
  updateRequestStatus: function(requestId, status) {
    const requests = State.getRequests();
    const request = requests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
      State.setRequests(requests);
      if (status === 'Completed') {
        this.addEarningsRecord(requestId);
      }
    }
  },
  addEarningsRecord: function(requestId) {
    const earnings = State.getEarnings();
    const newEarning = {
      id: 't' + (earnings.length + 1),
      distance: Math.floor(Math.random() * 50) + 1,
      fuel_cost: Math.floor(Math.random() * 30) + 5,
      estimated_earnings: Math.floor(Math.random() * 100) + 50,
      request_id: requestId
    };
    earnings.push(newEarning);
    State.setEarnings(earnings);
  }
};
