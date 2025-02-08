import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "67a21f75000bbcaf149c",
  platform: "com.roshan.lexio",
  databaseId: "67a220a9000a9f927caf",
  userCollectionId: "67a220c4001e59ccdef9",
  vocabularyCollectionId: "67a2211f001178f79a83",
};

const {
  endpoint,
  projectId,
  platform,
  databaseId,
  userCollectionId,
  vocabularyCollectionId,
} = appwriteConfig;

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avartarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avartarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currAccount = await account.get();

    if (!currAccount) throw Error;

    const currUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currAccount.$id)]
    );

    if (!currUser) throw Error;

    return currUser.documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getWords = async () => {
  try {
      const currUser = await getCurrentUser()
      const words = await databases.listDocuments(databaseId, vocabularyCollectionId, [Query.equal("user", currUser.$id)])

      if (!words) throw Error;

      return words.documents;
  } catch (error:any) {
    console.log(error);
    throw new Error(error);
    
  }
}

export const addNewWord = async (newWord:string) => {
  try {
    if (!newWord) throw Error;
    
  } catch (error: any) {
    throw new Error(error);
  }
}