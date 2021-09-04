import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader);

  const response = await fetch(
    `${process.env.BASE_FUNCTION_URL}/articles`,
    authHeader ? { headers: { Authorization: authHeader } } : undefined,
  );

  const data = await response.json();

  res.status(200).json(data);
};

export default handler;
