import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


async function test() {
  const { MediaRepository } = await import('../features/gallery/services/media.repository');
  const repo = new MediaRepository();
  try {
    console.log('Querying media...');
    await repo.query({ filters: [{ field: 'visibility', operator: '==', value: 'public' }], limit: 6 });
    console.log('Success!');
  } catch (error: any) {
    console.error('Caught error:');
    if (error.originalError) {
      console.error(error.originalError);
    } else {
      console.error(error);
    }
  }
  process.exit(0);
}

test();
