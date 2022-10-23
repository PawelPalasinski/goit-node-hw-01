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
  const contacts = await listContacts();
  const contact = contacts.find((item) => String(item.id) === String(id));
  if (!contact) {
    return null;
  }
  return contact;
};

// Add new contact: node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    console.log("++", contactsPath);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
};

// Remove contact using id: node index.js --action remove --id 3

const removeContact = async (id) => {
  try {
    const contacts = await getAll();
    const itemIndex = contacts.findIndex((item) => item.id.toString() === id);
    if (itemIndex === -1) {
      return null;
    }
    contacts.splice(itemIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
    return "Success remove";
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
