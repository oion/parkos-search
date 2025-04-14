type FeatureFlag = {
  [key: string]: boolean;
};

export const useFeatureFlags = () => {
  const mockedFeatureFlags = {
    searchFilterMinPrice: true,
    searchSortingAscending: false,
  };

  const fetchFeatureFlags = async (): Promise<FeatureFlag> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockedFeatureFlags);
      }, 1000);
    });
  };

  const getFeatureFlag = async (flag: string) => {
    const flags = await fetchFeatureFlags();

    return flags[flag] || null;
  };

  return {
    fetchFeatureFlags,
    getFeatureFlag,
  };
};
