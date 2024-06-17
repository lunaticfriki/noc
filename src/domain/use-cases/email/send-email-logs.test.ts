import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('send email logs test suite', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  );

  beforeEach(() => jest.clearAllMocks());

  it('should call sendEmail and saveLog', async () => {
    const result = await sendEmailLogs.execute('lunaticfriki@gmail.com');

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1,
    );
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: LogSeverityLevel.high,
      message: 'LOG EMAIL SENT',
      origin: 'send-email-logs.ts',
    });
  });

  it('should log in case of error', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
    const result = await sendEmailLogs.execute('lunaticfriki@gmail.com');

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1,
    );
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: LogSeverityLevel.high,
      message: 'Error: EMAIL LOG WAS NOT SENT',
      origin: 'send-email-logs.ts',
    });
  });
});
