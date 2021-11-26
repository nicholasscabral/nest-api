import { Vehicle } from "../vehicles/vehicle.entity";

export class TestVehicleUtil {
  static validVehicle(): Vehicle {
    return new Vehicle({
      id: "1",
      plate: "valid plate",
      description: "valid description",
      color: "valid color",
      model: "valid model",
    });
  }

  static vehiclesList(): Vehicle[] {
    const vehicle1 = new Vehicle({
      id: "1",
      plate: "valid plate",
      description: "valid description",
      color: "valid color",
      model: "valid model",
    });
    const vehicle2 = new Vehicle({
      id: "2",
      plate: "valid plate",
      description: "valid description",
      color: "valid color",
      model: "valid model",
    });
    const vehicle3 = new Vehicle({
      id: "3",
      plate: "valid plate",
      description: "valid description",
      color: "valid color",
      model: "valid model",
    });

    return [vehicle1, vehicle2, vehicle3];
  }
}
