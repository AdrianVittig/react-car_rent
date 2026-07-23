import type { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
export function formatFuel(par: string) : string{
    return par.charAt(0).toUpperCase() + par.slice(1).toLowerCase();
}

export function formatModel(par: string) : string{
    return par.split("_").join(" ");
}

export function getUsernameFromToken(token: string){
    return jwtDecode<{sub: string}>(token).sub;
}

export function formatErrorMessage(err: AxiosError): string {
    if (!err.response) {
        return "Something went wrong!";
    }

    const data = err.response.data;

    if (typeof data === "string") {
        return data;
    }

    if (typeof data === "object" && data !== null) {
        return Object.values(data as Record<string, string>).join(", ");
    }

    return "Something went wrong!";
}