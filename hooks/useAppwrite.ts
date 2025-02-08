import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: any) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const resp = await fn();

      setData(resp);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
