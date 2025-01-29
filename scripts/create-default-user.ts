import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createDefaultUser() {
  try {
    const user = await prisma.user.upsert({
      where: { email: 'alkindivv@gmail.com' },
      update: {
        name: 'AL KINDI',
        image: '/images/AL-KINDI.png',
      },
      create: {
        email: 'alkindivv@gmail.com',
        name: 'AL KINDI',
        image: '/images/AL-KINDI.png',
      },
    });

    console.log('Default user created:', user);
  } catch (error) {
    console.error('Error creating default user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDefaultUser();
