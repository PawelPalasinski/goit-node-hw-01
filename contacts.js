const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: udokumentuj każdą funkcję
const listContacts = () => {
  // ...twój kod
}

const getContactById = (contactId) => {
  // ...twój kod
}

const removeContact = (contactId) => {
  // ...twój kod
}

const addContact = (name, email, phone) => {
  // ...twój kod
}
