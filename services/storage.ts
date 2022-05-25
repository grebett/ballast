import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadString = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
};

export const saveString = async (
  key: string,
  value: string
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

export const load = async (key: string): Promise<any | null> => {
  try {
    const stringifiedJSONObject = await AsyncStorage.getItem(key);
    return JSON.parse(stringifiedJSONObject || '{}');
  } catch {
    return null;
  }
};

export const save = async (key: string, value: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const remove = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
};

export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch {}
};
