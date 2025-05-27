import User from '../models/User.js';
import Pet from '../models/pet.js';
import { generateMockUsers } from '../utils/mockingUsers.js';
import { generateMockPets } from '../utils/mockingPets.js';

export const getMockingUsers = async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    res.json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const generateData = async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;
    const createdUsers = [];
    const createdPets = [];

    // Generar y guardar mascotas usando mockingPets
    const mockPets = generateMockPets(pets);
    for (let pet of mockPets) {
      const newPet = await Pet.create(pet);
      createdPets.push(newPet);
    }

    // Generar y guardar usuarios
    const mockUsers = await generateMockUsers(users);
    for (let user of mockUsers) {
      const newUser = await User.create(user);
      createdUsers.push(newUser);
    }

    res.json({
      status: 'success',
      message: 'Datos generados e insertados',
      users: createdUsers.length,
      pets: createdPets.length
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getMockingPets = (req, res) => {
  const pets = generateMockPets(10);
  res.json(pets);
};