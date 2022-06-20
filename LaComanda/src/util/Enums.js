export const UserTypes = {
  OwnerOrSupervisor: 1,
  Employee: 2,
  Client: 3,
  Guest: 4,
  Table: 5,
  Product: 6,
  None: 0
};
export const OrderStatus = {
  WaitingList: '1',
  WaitingForScanTable: '2',
  ScannedAssignedTable: '3',
  OrderSended: '4',
  OrderConfirmed: '5',
  OrderRecived: '6',
  OrderRecivedConfirmed: '7',
  ClientEating: '8',
  WaitingCheck: '9',
  AlreadyPaid: '10',
  FinishedProcess: '11',
  None: '0'
};
export const ProductStatus = {
  Pendding: '1',
  InProgress: '2',
  Done: '3'
};
