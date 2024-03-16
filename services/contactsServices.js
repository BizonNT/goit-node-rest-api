import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (allContacts) =>
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

export async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

export async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

export async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return removedContact;
}

export async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const add = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(add);
  await updateContacts(allContacts);
  return add;
}

export async function updateContact(id, data) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  allContacts[index] = { ...allContacts[index], ...data };
  if (index === -1) {
    return null;
  }
  await updateContacts(allContacts);
  return allContacts[index];
}
