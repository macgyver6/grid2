interface Name {
  first: string;
  last: string;
}

interface Vehicle {
  uuid: string;
  type: string;
  color: string;
  owner: Name;
}

interface Boat extends Vehicle {
  boyancy: number;
}

interface Truck extends Vehicle {
  axles: number;
}

export function getBoat(config: Boat): Boat {
  return config;
}

// export const greenBoat: Boat = {
//   boyancy: 12,
//   color: "Green",
//   owner: { first: "Joe", last: "Smalls" },
//   type: "Boat",
//   uuid: "sdf"
// };
