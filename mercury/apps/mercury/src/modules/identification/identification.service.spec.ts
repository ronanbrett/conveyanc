import { Test, TestingModule } from '@nestjs/testing';
import { IdentificationService } from './identification.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './identification.model';

describe('IdentificationService', () => {
  let service: IdentificationService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentificationService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: () => true,
            create: () => false,
            updateOne: () => false,
          },
        },
      ],
    }).compile();

    service = module.get<IdentificationService>(IdentificationService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  describe('Saving a User', () => {
    it('should be able to create a user when it doesnt exist', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(userModel, 'create');
      await service.save({ username: 'unknownUser' });

      expect(userModel.findOne).toHaveBeenCalledWith({
        username: 'unknownUser',
      });

      expect(userModel.create).toHaveBeenCalledWith({
        username: 'unknownUser',
      });
    });

    it('should be able to update a user when it does exist', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue({
        username: 'test',
        updateOne: () => false,
      } as any);

      jest.spyOn(userModel, 'updateOne');
      const response = await service.save({ username: 'unknownUser' });

      expect(userModel.findOne).toHaveBeenCalledWith({
        username: 'unknownUser',
      });

      expect(response.username).toBe('test');
    });
  });
});
