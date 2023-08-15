import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState,useEffect, useCallback } from "react";


const useDataFetching = (url:string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<any>([]);

    const fetchData = useCallback(async () => {
        setLoading(true);

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            if(result) {
                setData(result);
                setLoading(false);
            }

        }catch(error:any){
            setError(error.message);
            setLoading(false);
        }

    }, [url]);
    useEffect(() => {
        fetchData();
    },[url])
    return [loading, error, data, fetchData];
};
 export default useDataFetching;