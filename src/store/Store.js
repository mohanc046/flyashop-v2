import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./apps/notes/NotesSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
import ChatsReducer from "./apps/chat/ChatSlice";
import ContactsReducer from "./apps/contacts/ContactSlice";
import EmailReducer from "./apps/email/EmailSlice";
import TicketReducer from "./apps/ticket/TicketSlice";
import headerTitleReducer from "./reducers/headerTitleSlice";

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    notesReducer: NotesReducer,
    chatReducer: ChatsReducer,
    contactsReducer: ContactsReducer,
    emailReducer: EmailReducer,
    ticketReducer: TicketReducer,
    headerTitle: headerTitleReducer,
  },
});

export default store;
