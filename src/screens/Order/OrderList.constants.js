export const orderListCategories = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" }
];

export const statusMapping = (action) => {
  if (action === "Reject") {
    return `PENDING:REJECTED`;
  } else if (action === "Accept") {
    return `PENDING:ACCEPTED`;
  } else if (action === "Cancel") {
    return `ACCEPTED:CANCELLED`;
  } else if (action === "Ship") {
    return `ACCEPTED:SHIPPED`;
  } else if (action === "Deliver") {
    return `SHIPPED:DELIVERED`;
  }
};

export const statusColors = {
  PENDING: "#FFA500",
  ACCEPTED: "#008000",
  REJECTED: "#FF0000",
  SHIPPED: "#0000FF",
  DELIVERED: "#4CAF50"
};

export const statusActions = {
  PENDING: [
    { label: "Reject", action: "Reject" },
    { label: "Accept", action: "Accept" }
  ],
  ACCEPTED: [
    { label: "Cancel", action: "Cancel" },
    { label: "Ship Now", action: "Ship" }
  ],
  REJECTED: [],
  SHIPPED: [
    { label: "Deliver", action: "Deliver" },
    { label: "Add Track", action: "Track" }
  ],
  DELIVERED: [{ label: "Activity", action: null }]
};
