import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./apps/notes/NotesSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
import ChatsReducer from "./apps/chat/ChatSlice";
import ContactsReducer from "./apps/contacts/ContactSlice";
import EmailReducer from "./apps/email/EmailSlice";
import TicketReducer from "./apps/ticket/TicketSlice";
import headerTitleReducer from "./reducers/headerTitleSlice";
import toasterReducer from "./reducers/toasterSlice";
import spinnerReducer from "./reducers/spinnerSlice";
import tokenReducer from "./reducers/tokenSlice";

export const store = configureStore({
  reducer: {
    authToken: tokenReducer,
    customizer: CustomizerReducer,
    notesReducer: NotesReducer,
    chatReducer: ChatsReducer,
    contactsReducer: ContactsReducer,
    emailReducer: EmailReducer,
    ticketReducer: TicketReducer,
    headerTitle: headerTitleReducer,
    toaster: toasterReducer,
    spinner: spinnerReducer
  }
});

export default store;
