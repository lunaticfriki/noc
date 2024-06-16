import { envs } from './envs.plugin';

describe('envs.plugin test suite', () => {
  it('should return env options', () => {
    expect(envs).toMatchObject({
      PORT: 3000,
      MAILER: {
        MAIL: 'lunaticfriki@gmail.com',
        SECRET_KEY: '123456789',
        SERVICE: 'gmail',
      },
      PROD: false,
      MONGO_URL: 'mongodb://lunaticfriki:123456@localhost:27017/',
      MONGO_DB_NAME: 'NOC_TEST',
      MONGO_USER: 'lunaticfriki',
      MONGO_PASS: '123456789',
    });
  });

  it('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');

      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
