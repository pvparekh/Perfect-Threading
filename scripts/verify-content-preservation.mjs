import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const snapshot = JSON.parse(fs.readFileSync(path.join(root, "docs/perfect-threading-redesign/approved-content-snapshot.json"), "utf8"));
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const errors = [];

for (const file of Object.keys(snapshot.originalSource)) {
  if (file.startsWith("src/pages/") && file !== "src/pages/services.tsx" && file !== "src/pages/index.tsx") {
    if (read(file) !== snapshot.originalSource[file]) errors.push("Approved source changed: " + file);
  }
}

const expectedHome = snapshot.originalSource["src/pages/index.tsx"]
  .replace('import { motion } from "framer-motion";\n', "")
  .replace(/const container = \{[\s\S]*?(?=export default function Home\(\))/, "")
  .replace(/        <motion\.div[\s\S]*?<\/motion\.div>/, '        <div className="hero-title"><h1>{title}</h1></div>')
  .replace(/\n\/\/deployment test - ignore\nconsole\.log\("Force rebuild – " \+ new Date\(\)\.toISOString\(\)\);\s*$/, "\n");
if (read("src/pages/index.tsx") !== expectedHome) errors.push("Homepage differs beyond approved heading animation removal");

const currentServices = read("src/pages/services.tsx");
const block = (content, name) => {
  const expression = new RegExp("    " + name + ": \\[([\\s\\S]*?)\\n    \\]");
  const match = content.match(expression);
  if (!match) return null;
  return [...match[1].matchAll(/name: "([^"]+)", price: "([^"]+)"/g)]
    .map((m) => ({ name: m[1], price: m[2] }));
};
for (const group of snapshot.services) {
  const current = block(currentServices, group.category);
  if (JSON.stringify(current) !== JSON.stringify(group.items)) errors.push("Service catalogue changed: " + group.category);
}
if (snapshot.services.reduce((sum, group) => sum + group.items.length, 0) !== 56) errors.push("Incorrect baseline entry count");

const footer = read("src/components/Footer.tsx");
for (const token of ["Perfect Threading Salon", "Contact us: (973) 341-5970 |📍235 Parsippany Rd, Parsippany, NJ", "Instagram", "All Rights Reserved."]) {
  if (!footer.includes(token)) errors.push("Footer lost approved content: " + token);
}
const navbar = read("src/components/Navbar.tsx");
for (const label of ["Home", "About", "Services", "Booking", "Contact", "Blog"]) {
  if (!navbar.includes('label: "' + label + '"')) errors.push("Missing navigation label: " + label);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Content lock passed: eight original-source public pages, unchanged homepage text, 56 exact service entries and shared navigation/footer labels.");
console.log("Rendered-content comparison and booking regression still require browser testing.");
