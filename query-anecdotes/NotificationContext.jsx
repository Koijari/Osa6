
import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch(action.type) {
    case "VOTE": 
      return `anecdote "${action.payload}" voted`;
    case "CLEAR":
      return "";
    case 'SHOW':
      return action.payload
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
