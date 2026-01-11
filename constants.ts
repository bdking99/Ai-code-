import { FileType } from "./types";

export const PRESET_PROMPTS = [
  {
    title: "React Component",
    prompt: "Create a responsive Navigation Bar component using React and Tailwind CSS.",
    type: FileType.TYPESCRIPT,
    filename: "Navbar"
  },
  {
    title: "Python Scraper",
    prompt: "A Python script using BeautifulSoup to scrape titles from a news website.",
    type: FileType.PYTHON,
    filename: "scraper"
  },
  {
    title: "SQL Schema",
    prompt: "Create a normalized SQL schema for an E-commerce database including users, products, and orders.",
    type: FileType.SQL,
    filename: "schema"
  },
  {
    title: "README Template",
    prompt: "A professional README.md for an open-source JavaScript library.",
    type: FileType.MARKDOWN,
    filename: "README"
  }
];