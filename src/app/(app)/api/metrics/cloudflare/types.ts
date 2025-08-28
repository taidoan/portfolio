export type RateLimitEntry = {
  count: number;
  resetTime: number;
};

type CloudflareApiError = {
  message: string;
  path?: string[];
  extensions?: Record<string, unknown>;
};

export type CloudflareStorageData = {
  max: {
    objectCount: number;
    uploadCount: number;
    payloadSize: number;
    metadataSize: number;
  };
  dimensions: {
    datetime: string;
    bucketName: string;
  };
};

export type CloudflareOperationData = {
  sum: {
    requests: number;
  };
  dimensions: {
    datetime: string;
    actionType: string;
  };
};

type CloudflareAccount = {
  r2StorageAdaptiveGroups?: CloudflareStorageData[];
  r2OperationsAdaptiveGroups?: CloudflareOperationData[];
};

export type CloudflareResponse = {
  data?: {
    viewer?: {
      accounts?: CloudflareAccount[];
    };
  };
  errors?: CloudflareApiError[];
};

export type OperationsTotals = {
  classA: number;
  classB: number;
};

export type CurrentUsage = {
  objectCount: number;
  totalStorage: string;
  storageCapacity: string;
  storageUsage: string;
  storageUsagePercentage: string;
  totalStorageBytes: number;
  payloadSize: string;
  metadataSize: string;
  uploadCount: number;
  operations: OperationsTotals;
  usedStorageSizeNoFormat: number;
  totalStorageBytesNoFormat: number;
};

export type AnalyticsResponse = {
  success: boolean;
  bucketName: string | null;
  currentUsage: CurrentUsage | null;
  lastUpdated?: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  message?: string;
};

export type ErrorResponse = {
  error: string;
  retryAfter?: number;
};

export type EnvironmentConfig = {
  accountId: string;
  apiToken: string;
};

export const ACTIONS = [
  'ListBuckets',
  'PutBucket',
  'ListObjects',
  'PutObject',
  'CopyObject',
  'CompleteMultipartUpload',
  'CreateMultipartUpload',
  'LifecycleStorageTierTransition',
  'ListMultipartUploads',
  'UploadPart',
  'UploadPartCopy',
  'ListParts',
  'PutBucketEncryption',
  'PutBucketCors',
  'PutBucketLifecycleConfiguration',
  'HeadBucket',
  'HeadObject',
  'GetObject',
  'UsageSummary',
  'GetBucketEncryption',
  'GetBucketLocation',
  'GetBucketCors',
  'GetBucketLifecycleConfiguration',
] as const;

export type ActionType = (typeof ACTIONS)[number];

export type GraphQLQuery = {
  query: string;
  variables: {
    accountTag: string;
    startDate: string;
    endDate: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CloudflareApiResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
}
