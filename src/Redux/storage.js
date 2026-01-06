import AsyncStorage from "@react-native-async-storage/async-storage";

 export const storeData = async(key, Value) => {
    try{
        await AsyncStorage.setItem(key, JSON.stringify(Value));
    }
    catch(error){
        // console.log("Error storing Data", error)
    }
};

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (e) {
      // console.log("Error reading data", e);
    }
};

