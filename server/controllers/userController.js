import bcrypt from 'bcrypt';
import * as User from '../models/User.js';

const SALT_ROUNDS = 10; // how much work bcrypt does to scramble the password

function validateUser({ firstName, lastName, email, password }, requirePassword = true) {
  const errors = [];
  if (!firstName) errors.push('firstName is required');
  if (!lastName) errors.push('lastName is required');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('A valid email is required');
  if (requirePassword && (!password || password.length < 8)) {
    errors.push('password must be at least 8 characters');
  }
  return errors;
}

// POST /api/users
export async function createUser(req, res) {
  try {
    const errors = validateUser(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.createUser({ firstName, lastName, email, passwordHash });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email is already registered' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

// GET /api/users/:id
export async function getUser(req, res) {
  try {
    const user = await User.findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

// PUT /api/users/:id
export async function updateUser(req, res) {
  try {
    const errors = validateUser(req.body, false);
    if (errors.length) return res.status(400).json({ errors });

    const user = await User.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email is already registered' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

// DELETE /api/users/:id
export async function deleteUser(req, res) {
  try {
    const deleted = await User.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}