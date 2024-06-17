import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('check service test suite', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback,
  );

  beforeEach(() => jest.clearAllMocks());

  it('should call success callback when fetch returns true', async () => {
    const ok = await checkService.execute('https://google.com');
    expect(ok).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  it('should call error callback when fetch fails', async () => {
    const ok = await checkService.execute('https://goasdasdasdasdle.com');
    expect(ok).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
