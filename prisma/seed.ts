import { PrismaClient, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@kakamega.org' },
    update: {},
    create: {
      email: 'admin@kakamega.org',
      name: 'Admin User',
      role: 'admin',
      password: adminPassword,
    } as Prisma.UserCreateInput,
  });

  // Create sample events
  const events = [
    {
      title: 'Community Tree Planting Day',
      description: 'Join us for a community-wide tree planting event in Lurambi Sub-County. We aim to plant 500 trees in degraded areas.',
      date: new Date('2026-09-15T08:00:00Z'),
      time: '8:00 AM',
      location: 'Lurambi Primary School',
      type: 'tree-planting',
      spots: 150,
      registered: 87,
      image: '/images/events/tree-planting.jpg',
    },
    {
      title: 'Youth Climate Action Workshop',
      description: 'Interactive workshop for youth aged 15-25 on climate action, sustainable practices, and environmental stewardship.',
      date: new Date('2026-09-22T09:00:00Z'),
      time: '9:00 AM',
      location: 'Kakamega Town Hall',
      type: 'workshop',
      spots: 50,
      registered: 34,
      image: '/images/events/youth-workshop.jpg',
    },
    {
      title: 'School Environmental Club Training',
      description: 'Training session for teachers and students on establishing and running school environmental clubs.',
      date: new Date('2026-10-05T10:00:00Z'),
      time: '10:00 AM',
      location: 'Mahiakalo Secondary',
      type: 'training',
      spots: 40,
      registered: 28,
      image: '/images/events/school-training.jpg',
    },
  ];

  const createdEvents = await Promise.all(
    events.map((event) => prisma.event.create({ data: event }))
  );

  // Create sample projects
  const projects = [
    {
      title: 'Lurambi Forest Restoration',
      description: 'Restoring degraded forest areas through community-driven tree planting and native species conservation.',
      location: 'Lurambi Sub-County',
      status: 'active',
      progress: 68,
      trees: 3200,
      volunteers: 120,
      type: 'forest',
      latitude: 0.2833,
      longitude: 34.7531,
      image: '/images/projects/forest.jpg',
    },
    {
      title: 'School Greening Program',
      description: 'Partnering with 28 schools to establish food forests, school nurseries, and environmental clubs.',
      location: 'Kakamega Central',
      status: 'active',
      progress: 45,
      trees: 1500,
      volunteers: 85,
      type: 'school',
      latitude: 0.2827,
      longitude: 34.7563,
      image: '/images/projects/school.jpg',
    },
    {
      title: 'River Cleanup Initiative',
      description: 'Monthly river cleanup campaigns protecting local waterways and raising environmental awareness.',
      location: 'Kakamega North',
      status: 'active',
      progress: 82,
      trees: 500,
      volunteers: 200,
      type: 'river',
      latitude: 0.2567,
      longitude: 34.7892,
      image: '/images/projects/river.jpg',
    },
  ];

  const createdProjects = await Promise.all(
    projects.map((project) => prisma.project.create({ data: project }))
  );

  // Create sample stories
  const stories = [
    {
      title: 'How Tree Planting Transformed My Village',
      content: 'Before the Kakamega Empowerment project, our village faced severe soil erosion and deforestation. Through community tree planting initiatives, we have restored 50 acres of degraded land, improved water retention, and seen wildlife return to our area.',
      authorName: 'Wanjiku Mwangi',
      authorRole: 'Community Leader, Lurambi',
      image: '/images/stories/wanjiku.jpg',
      isFeatured: true,
      projectId: createdProjects[0].id,
    },
    {
      title: 'Youth Leading Environmental Change',
      content: 'As a youth volunteer, I never imagined I could make such a difference. Through Kakamega Empowerment, I have organized tree planting events that engaged over 200 young people in environmental conservation.',
      authorName: 'David Otieno',
      authorRole: 'Youth Volunteer',
      image: '/images/stories/david.jpg',
      isFeatured: true,
      projectId: createdProjects[1].id,
    },
    {
      title: 'Environmental Education in Schools',
      content: 'The school greening program has transformed environmental education from theory to practice. Students now maintain school nurseries, learning valuable skills while contributing to reforestation efforts.',
      authorName: 'Sarah Nabiswa',
      authorRole: 'Teacher, St. Mary\'s Primary',
      image: '/images/stories/sarah.jpg',
      isFeatured: true,
      projectId: createdProjects[1].id,
    },
  ];

  await Promise.all(
    stories.map((story) => prisma.story.create({ data: story }))
  );

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });