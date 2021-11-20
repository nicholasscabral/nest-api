import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TestUtil } from "../utils/test.util";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

const mockRepository = {
  createQueryBuilder: jest.fn(),
  verifyCredentials: jest.fn(),
  create: jest.fn().mockReturnValue(TestUtil.validUser()),
  save: jest.fn().mockResolvedValue(TestUtil.validUser()),
  find: jest.fn().mockResolvedValue(TestUtil.userList()),
  findOneOrFail: jest.fn().mockResolvedValue(TestUtil.userList()[0]),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("UserService", () => {
  let service: UsersService;
  let repository: UsersRepository;

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
    repository = module.get<UsersRepository>(
      getRepositoryToken(UsersRepository)
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("findAll", () => {
    it("should be able to return all users", async () => {
      const result = await service.findAll();

      expect(result).toEqual(TestUtil.userList());
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it("should be able to throw an exception", () => {
      jest.spyOn(repository, "find").mockRejectedValueOnce(new Error());

      expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should be able to return a user", async () => {
      const result = await service.findOne("1");

      expect(result).toEqual(TestUtil.userList()[0]);
      expect(repository.findOneOrFail).toBeCalledTimes(1);
    });

    it("should be able to throw an not found exception", async () => {
      jest
        .spyOn(repository, "findOneOrFail")
        .mockRejectedValueOnce(new Error());

      expect(service.findOne).rejects.toThrowError(NotFoundException);
    });
  });

  describe("create", () => {
    it("should be able to create a new user", async () => {
      const result = await service.create(TestUtil.validDto());

      expect(result.user).toEqual(TestUtil.validUser());
      expect(repository.verifyCredentials).toBeCalledTimes(1);
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.save).toBeCalledTimes(1);
    });

    it("should be able to throw an exception", () => {
      jest.spyOn(repository, "save").mockRejectedValueOnce(new Error());

      expect(service.create(TestUtil.validDto())).rejects.toThrowError();
    });
  });
});
