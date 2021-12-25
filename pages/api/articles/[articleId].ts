import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const requestInit: RequestInit = {
    method: 'PUT',
    headers: { authorization: req.headers.authorization } as HeadersInit,
    body: req.body,
  };

  const response = await fetch(`${process.env.BASE_FUNCTION_URL}/articles`, requestInit);

  const data = await response.json();

  res.status(200).json(data);
};

export default handler;
