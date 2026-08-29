export function getDansalColor(type: string) {
  switch (type) {
    case "bath":
      return "blue";

    case "rice_curry":
      return "green";

    case "ice_cream":
      return "pink";

    case "paan":
      return "purple";

    case "tea_drinks":
      return "orange";

    case "soup":
      return "red";

    case "fruit":
      return "yellow";

    case "biscuit":
      return "brown";

    case "beema":
      return "gold";

    case "belimal":
      return "orange";

    case "milk":
      return "white";

    case "kos":
      return "green";

    case "mannokka":
      return "orange";

    case "sawu":
      return "purple";

    case "other":
      return "gray";

    default:
      return "black";
  }
}
