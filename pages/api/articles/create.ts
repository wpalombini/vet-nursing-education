import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const requestInit: RequestInit = {
    method: 'POST',
    headers: { authorization: req.headers.authorization } as HeadersInit,
    body: req.body,
  };

  const response = await fetch(`${process.env.BASE_FUNCTION_URL}/articles`, requestInit);

  const data = await response.json();

  res.status(200).json(data);
};

export default handler;
