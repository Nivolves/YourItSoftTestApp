import { createContext } from "react";

import { TContext } from "./types";

const context = createContext<TContext | null>(null);

export default context;
