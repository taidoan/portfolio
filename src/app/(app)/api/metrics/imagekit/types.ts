export type EnvironmentConfig = {
  privateKey: string;
};

export type MetricsResponse = {
  success: boolean;
  bandwidthBytes: number;
  mediaLibraryStorageBytes: number;
  videoProcessingUnitsCount: number;
  originalCacheStorageBytes: number;
  startDate: string;
  endDate: string;
};
