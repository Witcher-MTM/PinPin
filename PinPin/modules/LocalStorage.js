import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveDataToLocalStorage = async (obj) => {
    try {
        const { key, data } = obj
        console.log(`key:${key}, data:${data}`)
        await AsyncStorage.setItem(key, data.toString());
        console.log('Дані збережено успішно.');
    } catch (error) {
        console.error('Помилка збереження даних: ', error);
    }
};
export const getDataFromLocalStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            console.log('Отримані дані з локального сховища:');
            return data
        } else {
            console.log('Дані не знайдено в локальному сховищі.');
            return null
        }
    } catch (error) {
        console.error('Помилка отримання даних: ', error);
    }
};
export const SaveHistoryWins = async (obj) => {
    try {
        const { key, data } = obj;
        const localData = await AsyncStorage.getItem(key);
        let existingData = localData ? JSON.parse(localData) : [];
        console.log("in save", existingData)
        console.log("in save data", data)
        const collection = [...existingData];
        collection.push(data)
        console.log("in save", collection)
        await AsyncStorage.setItem(key, JSON.stringify(collection));
        console.log(`Дані збережено успішно.`);
    } catch (error) {
        console.error('Помилка збереження даних: ', error);
    }
};
export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Всі дані успішно видалені з локального сховища.');
    } catch (error) {
        console.error('Помилка під час видалення даних: ', error);
    }
}
