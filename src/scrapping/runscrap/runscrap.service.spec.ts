import { Test, TestingModule } from '@nestjs/testing';
import { RunscrapService } from './runscrap.service';
import { Pool } from 'mysql2/promise';

describe('RunscrapService', () => {
  let service: RunscrapService;
  let connectionNVMock: Pool;
  let connectionMirrorEnviMock: Pool;

  beforeEach(async () => {
    connectionNVMock = {
      query: jest.fn().mockResolvedValue([[], []]),
      end: jest.fn().mockResolvedValue(undefined),
    } as any as Pool;

    connectionMirrorEnviMock = {
      query: jest.fn().mockResolvedValue([[], []]),
      end: jest.fn().mockResolvedValue(undefined),
    } as any as Pool;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RunscrapService,
        { provide: 'connectionNV', useValue: connectionNVMock },
        { provide: 'connectionMirrorEnvi', useValue: connectionMirrorEnviMock },
      ],
    }).compile();

    service = module.get<RunscrapService>(RunscrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should start scrapping on module init', async () => {
    const startScrappingSpy = jest.spyOn(service, 'startScrapping');
    service.onModuleInit();
    expect(startScrappingSpy).toHaveBeenCalled();
  });

  it('should close database connections on module destroy', async () => {
    await service.onModuleDestroy();
    expect(connectionNVMock.end).toHaveBeenCalled();
    expect(connectionMirrorEnviMock.end).toHaveBeenCalled();
  });

  // it('should handle errors and continue scrapping', async () => {
  //   jest.useFakeTimers();
  //   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  //   const querySpy = jest.spyOn(connectionNVMock, 'query').mockImplementation(() => {
  //     throw new Error('Test Error');
  //   });

  //   service.startScrapping();

  //   jest.advanceTimersByTime(5000);
  //   expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', 'Test Error');
  //   expect(querySpy).toHaveBeenCalled();

  //   jest.useRealTimers();
  // });

  // it('should wait before next iteration', async () => {
  //   jest.useFakeTimers();
  //   const querySpy = jest.spyOn(connectionNVMock, 'query').mockResolvedValue([[], []]);

  //   service.startScrapping();

  //   jest.advanceTimersByTime(5000);
  //   expect(querySpy).toHaveBeenCalledTimes(1);

  //   jest.advanceTimersByTime(5000);
  //   expect(querySpy).toHaveBeenCalledTimes(2);

  //   jest.useRealTimers();
  // });
});
