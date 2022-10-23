const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

// Get all contacts: node index.js --action list

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message.red);
  }
};

// Find contact by id: node index.js --action get --id 5

const getContactById = async (id) => {
  const contactsArr = await listContacts();
  const contact = contactsArr.find(element => element.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

// Add new contact: node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

const addContact = async (name, email, phone) => {
  try {
    const contactsArr = await listContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contactsArr.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
    console.table(contactsArr);
    console.log('Contact: '.blue + name.yellow + ' was added to contacts'.blue);
  } catch (error) {
    console.log(error.red);
  }
};

// Remove contact using id: node index.js --action remove --id 3

const removeContact = async (id) => {
  try {
    const contactsArr = await listContacts();
    const itemIndex = contactsArr.findIndex(element => element.id === id);
    if (itemIndex === -1) {
      return null;
    }
    contactsArr.splice(itemIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
    console.table(contactsArr);
    return console.log('Contact with id: '.blue + id.yellow + ' was removed'.blue);
  } catch (error) {
    console.log(error.red);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
