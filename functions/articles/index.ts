import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const getArticles = async (context: Context, req: HttpRequest) => {
    return await new Promise<any>((resolve) => {
        resolve([
            {
                id: 1,
                title: 'article title 1',
                content: 'article content 1'
            },
            {
                id: 2,
                title: 'article title 2',
                content: 'article content 2'
            }
        ])
    })
}

const createArticle = async (context: Context, req: HttpRequest) => {
    return await new Promise<any>((resolve) => {
        resolve([
            {
                id: 1,
                title: 'article title 1',
                content: 'article content 1'
            },
            {
                id: 2,
                title: 'article title 2',
                content: 'article content 2'
            }
        ])
    })
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Start article function request.');

    let data;

    switch (req.method) {
        case "GET":
            data = await getArticles(context, req);
            break;
        case "POST":
            data = await createArticle(context, req);
            break;
    
        default:
            break;
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
    context.log('End article function request.', { data });
};

export default httpTrigger;