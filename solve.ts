const {
  nodes,
  relationships,
}: {
  nodes: Companies;
  relationships: Relationships;
} = require("./data.json");

type CompanyId = `company${number}`;
type Relationships = Record<
  CompanyId,
  Array<{ to: CompanyId; timePrice: number }>
>;

type Company = {
  name: string;
  swag: number;
  timePrice: number;
};

type Companies = Record<CompanyId, Company>;

const TIME_BUDGET = 4500;
const STARTING_COMPANY_ID: CompanyId = "company56";

let currentCompany = STARTING_COMPANY_ID;
let timeLeft = TIME_BUDGET;
let result = "";
const visited = new Set<string>();

while (timeLeft > 0) {
  const costToVisit = nodes[currentCompany].timePrice;

  if (!visited.has(currentCompany) && timeLeft >= costToVisit) {
    visited.add(currentCompany);
    timeLeft -= costToVisit;
    result += `(${nodes[currentCompany].name}:collect)-->`;
  } else {
    result += `(${nodes[currentCompany].name})-->`;
  }

  const possiblePaths = relationships[currentCompany];

  let nextPath =
    possiblePaths[Math.floor(Math.random() * possiblePaths.length)];

  timeLeft -= nextPath.timePrice;
  currentCompany = nextPath.to;
}

console.log(result.slice(0, -3));
