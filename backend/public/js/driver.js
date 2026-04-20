// js/driver.js - Driver specific logic
const Driver = {
  addRequest: function(request) {
    const requests = State.getRequests();
    const newRequest = {
      id: 'r' + (requests.length + 1),
      ...request,
      status: 'Pending'
    };
    requests.push(newRequest);
    State.setRequests(requests);
    return newRequest;
  }
};
