import { Department } from './../../src/departments/departments.entity';
import { AppDataSource } from 'src/data-source';

const seedDepartments = async () => {
  await AppDataSource.initialize();

  const departmentRepo = AppDataSource.getRepository(Department);

  const existingCount = await departmentRepo.count();
  if (existingCount > 0) {
    console.log('Departments already seeded.');
    return;
  }

  const departments = [
    { name: 'HR', description: 'Handles employee relations', isActive: true },
    { name: 'IT', description: 'Manages tech infrastructure', isActive: true },
    { name: 'Finance', description: 'Handles company finance', isActive: true },
  ];

  await departmentRepo.save(departments);
  console.log('✅ Departments seeded successfully.');
};

seedDepartments()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding departments:', err);
    process.exit(1);
  });
