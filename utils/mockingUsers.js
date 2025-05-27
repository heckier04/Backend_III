import bcrypt from 'bcrypt';

// Roles posibles
const roles = ['user', 'admin'];

// Nombres y apellidos de ejemplo
const names = ['Juan', 'Ana', 'Luis', 'Maria', 'Pedro', 'Lucia'];
const lastNames = ['Gomez', 'Perez', 'Lopez', 'Diaz', 'Sanchez', 'Torres'];

// Función para obtener un nombre aleatorio
function randomName() {
  return names[Math.floor(Math.random() * names.length)];
}

// Función para obtener un apellido aleatorio
function randomLastName() {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

// Genera usuarios falsos
export async function generateMockUsers(count = 1) {
const users = [];
const hashedPassword = await bcrypt.hash('coder123', 10);

for (let i = 0; i < count; i++) {
    users.push({
        first_name: randomName(),
        last_name: randomLastName(),
        email: `user${i}_${Date.now()}@mail.com`,
        password: hashedPassword,
      role: roles[Math.floor(Math.random() * roles.length)],
        pets: []
    });
}
    return users;
}