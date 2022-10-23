const { Command } = require("commander");
const program = new Command();

require("colors");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      return console.table(await listContacts());
      break;

    case "get":
      return console.table(await getContactById(id));
      break;

    case "add":
      return console.table(await addContact(name, email, phone));
      break;

    case "remove":
      return console.table(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);