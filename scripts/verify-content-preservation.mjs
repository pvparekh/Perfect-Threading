import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const snapshot = JSON.parse(fs.readFileSync(path.join(root, "docs/perfect-threading-redesign/approved-content-snapshot.json"), "utf8"));
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const contentOnly = Object.keys(snapshot.originalSource).filter((file) =>
  file.startsWith("src/pages/") && file !== "src/pages/services.tsx"
);
const errors = [];
for (const filename of contentOnly) {
  if (read(filename) !== snapshot.originalSource[filename]) errors.push("Approved source changed: " + filename);
}
const currentServices=read("src/pages/services.tsx");
const matchBlock=(source,name) => {
  const match = source.match(new RegExp("    " + name + ": \\[([\\s\\S]*?)\\n    \\]"));
  if (!match) return null;
  return [...match[1].matchAll(/\\{ name: "([^"]+)", price: "([^"]+)" \\}/g)].map((m)=>({name:m[1],price:m[2]}));
};
for (const section of snapshot.services) {
  const now=matchBlock(currentServices,section.category);
  if (JSON.stringify(now)!==JSON.stringify(section.items)) errors.push("Service catalogue changed: "+section.category);
}
const total=snapshot.services.reduce((a,c)=>a+c.items.length,0);
if(total!==56)errors.push("Expected 56 baseline entries; found "+total);
const footer=read("src/components/Footer.tsx");
for(const token of ["Perfect Threading Salon","Contact us: (973) 341-5970 |📍235 Parsippany Rd, Parsippany, NJ","Instagram","All Rights Reserved."]){
  if(!footer.includes(token))errors.push("Footer lost approved content: "+token);
}
const navbar=read("src/components/Navbar.tsx");
for(const label of ["Home","About","Services","Booking","Contact","Blog"]){
  if(!navbar.includes('label: "'+label+'"')) errors.push("Missing navigation label: "+label);
}
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log("Content source lock passed: eight unchanged public pages, 56 original services, original footer text and navigation labels.");
console.log("Rendered-content and booking-path tests are still required for final acceptance.");
