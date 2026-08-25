export function getDansalColor(type: string) {
  switch (type) {
    case "Bath":
      return "blue";

    case "Rice & Curry":
      return "green";

    case "Ice Cream":
      return "pink";

    case "Paan":
      return "purple";

    case "Tea/Drinks":
      return "orange";

    case "Soup":
      return "red";

    case "Fruit":
      return "yellow";

    case "Biscuit":
      return "brown";

    case "Water":
      return "cyan";

    case "Other":
      return "gray";

    default:
      return "black";
  }
}
