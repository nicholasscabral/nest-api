import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TestVehicleUtil } from "../utils/test.vehicles.util";
import { VehiclesRepository } from "./vehicles.repository";
import { VehiclesService } from "./vehicles.service";
import { UsersService } from "../users/users.service";
import { NotFoundException } from "@nestjs/common";

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn().mockResolvedValue(TestVehicleUtil.vehiclesList()),
  findOneOrFail: jest.fn().mockResolvedValue(TestVehicleUtil.validVehicle()),
  update: jest.fn(),
  delete: jest.fn().mockResolvedValue(undefined),
};

const mockUsersService = {
  findOne: jest.fn(),
};

describe("VehiclesService", () => {
  let service: VehiclesService;
  let repository: VehiclesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getRepositoryToken(VehiclesRepository),
          useValue: mockRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    repository = module.get<VehiclesRepository>(VehiclesRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("findALl", () => {
    it("it should be able to return all vehicles", async () => {
      const result = await service.findAll();

      expect(result).toEqual(TestVehicleUtil.vehiclesList());
      expect(repository.find).toBeCalledTimes(1);
    });

    it("should be able to throw an exception", async () => {
      jest.spyOn(repository, "find").mockRejectedValueOnce(new Error());

      expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should be able to return a vehicle", async () => {
      const result = await service.findOne("1");

      expect(result).toEqual(TestVehicleUtil.validVehicle());
      expect(repository.findOneOrFail).toBeCalledTimes(1);
    });

    it("should be able to throw an not found exception", async () => {
      jest
        .spyOn(repository, "findOneOrFail")
        .mockRejectedValueOnce(new Error());

      expect(service.findOne("1")).rejects.toThrowError(NotFoundException);
    });
  });

  describe("delete", () => {
    it("should be able to delete a vehicle", async () => {
      const result = await service.delete("1");

      expect(result).toBeUndefined();
    });

    it("should be to throw a not found exception", async () => {
      jest
        .spyOn(repository, "findOneOrFail")
        .mockRejectedValueOnce(new Error());

      expect(service.delete("1")).rejects.toThrowError(NotFoundException);
    });

    it("should be to throw an exception", async () => {
      jest.spyOn(repository, "delete").mockRejectedValueOnce(new Error());

      expect(service.delete("1")).rejects.toThrowError();
    });
  });
});
