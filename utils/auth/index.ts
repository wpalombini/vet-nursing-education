export const getAuthHeader: (tokenId: string | undefined) => string = (tokenId: string | undefined): string => {
  return `Bearer ${tokenId}`;
};
