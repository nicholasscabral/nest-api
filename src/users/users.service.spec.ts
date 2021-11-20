import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TestUtil } from "../utils/test.util";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

const mockRepository = {
  createQueryBuilder: jest.fn(),
  verifyCredentials: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn().mockResolvedValue(TestUtil.userList()),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("UserService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should be able to return all users", async () => {
      const result = await service.findAll();

      expect(result).toEqual(TestUtil.userList());
    });
  });
});
