import { QueryParams } from "../shared/shared";

export type ValidFilterKeys = "login" | "followers";

export type ValidFilterLabels = "login" | "followers";

export type ValidFilterParams = Partial<Pick<QueryParams, ValidFilterKeys>>;
