export function generateMockPets(count = 10) {
  const speciesList = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster'];
  const pets = [];

  for (let i = 0; i < count; i++) {
    pets.push({
      name: `Pet${i}`,
      species: speciesList[Math.floor(Math.random() * speciesList.length)],
      age: Math.floor(Math.random() * 15) + 1
    });
  }

  return pets;
}