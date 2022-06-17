import { createContext } from 'react';

const GlobalContext = createContext({
  user: {
    name: '', surname: '', role: '', cuil: '', approved: false, email: '', dni: '', photo: '', password: ''
  },
  setUser: () => {},
  client: {
    name: '', surname: '', role: '', email: '', orderState: '', assignedTable: '', photo: '', order: {}, surveysDone: false
  },
  setClient: () => {},
  clients: [],
  setClients: () => [{}]
});

export default GlobalContext;
