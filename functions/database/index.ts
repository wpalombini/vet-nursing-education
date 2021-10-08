import { CosmosClient } from "@azure/cosmos";

export const getDbContainer= async () => {
    const client = new CosmosClient({ 
        endpoint: process.env.AZURE_COSMOS_ENDPOINT,
        key: process.env.AZURE_COSMOS_KEY
    });

    const db = await client.databases.createIfNotExists({ id: process.env.AZURE_COSMOS_DB_ID });

    return db.database;
}