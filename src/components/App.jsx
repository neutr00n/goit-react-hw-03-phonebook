import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { NoContacts } from './NoContacts/NoContacts';
import { setLocalStorage, getLocalStorage } from './LocalStorage/LocalStorage';
import { Wrapper, Title, ContactsTitle } from './App.styled';

const LOC_STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageValue = getLocalStorage(LOC_STORAGE_KEY);

    this.setState({ contacts: storageValue });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length !== contacts.length) {
      setLocalStorage(LOC_STORAGE_KEY, contacts);
    }
  }

  handleFormSubmit = (values, { resetForm }) => {
    const contact = { id: nanoid(), ...values };
    const isAdded = this.checkContactIsAdded(contact);

    if (isAdded) {
      return alert(`${contact.name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));

    resetForm();
  };

  handleRemoveContact = ContactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== ContactId),
    }));
  };

  handleFilterValue = ({ currentTarget }) => {
    const name = currentTarget.value;

    this.setState({ filter: name });
  };

  displayedContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedSearchingName = filter.toLocaleLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().trim().includes(normalizedSearchingName)
    );
  };

  checkContactIsAdded = ({ name }) => {
    const { contacts } = this.state;
    const normalizedContactName = name.toLowerCase();

    return contacts.find(
      ({ name }) => name.toLowerCase().trim() === normalizedContactName
    );
  };

  render() {
    const { filter } = this.state;
    const displayedContacts = this.displayedContacts();

    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm handleFormSubmit={this.handleFormSubmit} />
        <ContactsTitle>Contacts:</ContactsTitle>
        <Filter handleFilterValue={this.handleFilterValue} value={filter} />
        {displayedContacts.length !== 0 ? (
          <ContactList
            contacts={displayedContacts}
            handleRemoveContact={this.handleRemoveContact}
          />
        ) : (
          <NoContacts />
        )}
      </Wrapper>
    );
  }
}
