import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContactInfo = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name & !email & !phone) {
      throw HttpError(400, "Body must have at least one field");
    }
    const { id } = req.params;
    const result = await updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = await getContactById(id);
    if (!body) {
      throw HttpError(404, "Not found");
    }
    body.favorite = !body.favorite;
    const result = await updateContact(id, body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
