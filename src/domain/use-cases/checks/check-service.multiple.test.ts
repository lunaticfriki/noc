import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service.multiple';

describe('check service test suite', () => {
  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepositories = [mockRepo1, mockRepo2, mockRepo3];

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    mockRepositories,
    successCallback,
    errorCallback,
  );

  beforeEach(() => jest.clearAllMocks());

  it('should call success callback when fetch returns true', async () => {
    const ok = await checkServiceMultiple.execute('https://google.com');
    expect(ok).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    mockRepositories.forEach((repo) =>
      expect(repo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity)),
    );
  });

  it('should call error callback when fetch fails', async () => {
    const ok = await checkServiceMultiple.execute(
      'https://goasdasdasdasdle.com',
    );
    expect(ok).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    mockRepositories.forEach((repo) =>
      expect(repo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity)),
    );
  });
});
