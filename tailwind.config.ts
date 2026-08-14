import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { berry: "#d292a8", laurel: "#aeb080", pistachio: "#dfe0cc", plum: "#631b40" }, fontFamily: { serif: ["Georgia", "serif"] } } }, plugins: [] } satisfies Config;
