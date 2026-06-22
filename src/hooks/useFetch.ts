import { useEffect, useState } from "react";

export type FetchState<T> = {
    data?: T | null;
    loading: boolean;
    error?: string | null
}

export default function UseFetch<T>(url:string): FetchState<T>{
    
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(url)
        .then(res => {
            if (!res.ok)
                throw new Error("Erro");
            return res.json() as Promise<T>;
        })
        .then(json => {
            setData(json);
        })
        .catch(error => {
            setError(error);
        })
        .finally(() => setLoading(false));
    }, [url]);

    return {data, loading, error};
}