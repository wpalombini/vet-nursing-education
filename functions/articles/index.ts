if (process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development') {
    require("dotenv").config();
}
import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const getDbContainer= async () => {
    const client = new CosmosClient({ 
        endpoint: process.env.AZURE_COSMOS_ENDPOINT,
        key: process.env.AZURE_COSMOS_KEY
    });

    const db = await client.databases.createIfNotExists({ id: process.env.AZURE_COSMOS_DB_ID });

    return db.database;
}

const getArticles = async (context: Context, req: HttpRequest) => {
    const db = await getDbContainer();

    const articles = await db.container('articles').items.readAll().fetchAll();
    
    const data = await new Promise<any>((resolve) => {
        resolve(articles.resources.map(item => {
            return {
                id: item.id,
                title: item.title,
                content: item.content,
                createdAt: item.createdAt,
            }
        }));
    })

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}

const createArticle = async (context: Context, req: HttpRequest) => {
    const db = await getDbContainer();
    
    const article: any = {
        id: new Date().getTime().toString(),
        createdAt: new Date()
    };

    article.title = req.body.title;
    article.content = req.body.content;

    await db.container('articles').items.create(article);

    context.res = {
        status: 201,
        body: article
    };
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Start article function request.', process.env);

    switch (req.method) {
        case "GET":
            await getArticles(context, req);
            break;
        case "POST":
            await createArticle(context, req);
            break;
    
        default:
            break;
    }

    context.log('End article function request.');
};

export default httpTrigger;