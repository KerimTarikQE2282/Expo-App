import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


export const appwriteConfig={
    endpoint: 'https://cloud.appwrite.io/v1',
    platform:'com.jsm.auora',
    projectId: '673a3086002f6bd341d4',
    databaseId:'673a32bb002148553bdd',
    userCollectionId:'673a330400330b68df3a',
    videoCollectionId:'673a33340005074efc79',
    storageId:'673a34d20024ac0ff22a'
}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform ) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars=new Avatars(client)
const databases=new Databases(client)


export const createUser= async (email,username,password)=>{

  try {
    const newAccount =await account.create(
        ID.unique(),
        email,
        password,
        username
    )
    if(!newAccount) throw Error;

    const avatarurl = avatars.getInitials(username);

    const newUser=await  databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
    accountId:newAccount.$id,
    Email:email,
    UserName:username,
    avatar:avatarurl
    }
)
    return newAccount
  } catch (error) {
    throw new Error(error)
 }
}

export async function  signIn(email,password){
try{
const session=await account.createEmailPasswordSession(email,password)
return session
}
catch(e){
throw new Error(e)
}
}

export const getCurrentUser = async ()=>{
    try {
        const getCurrentUser=await account.get()
        if(!getCurrentUser) throw Error;
        const currentUser=await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId',getCurrentUser.$id)]
            

        )
        if(!currentUser) {
            throw Error;
        }
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}



export const getAllPosts=async ()=>{
    try {
        const posts=await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId)
        return posts.documents
    } catch (error) {
        console.log(error)
    }
}



export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)] // Queries as separate items
        );
        return posts.documents;
    } catch (error) {
        console.log(error); // Consider better error handling in production
        return null; // Explicitly return null on error
    }
};


export const searchPosts = async (query) => {

    try {
        const post = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        );


        return post.documents;
    } catch (error) {
        throw error; // Preserve the original error
    }
};

export const getUserPosts=async (userId) => {
    console.log("🚀 ==> file: appwrite.js:132 ==> getUserPosts ==> userId:", userId);
    

    try {
        const posts=await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator',userId)]
        )
        return posts.documents
    } catch (error) {
        console.error(error)
    }
   
}


export const signOut=async  ()=>{
try {
    const session=await account.deleteSession('current')
    return session
} catch (error) {
    console.error(error)
}
}