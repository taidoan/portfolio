import type { ActionType } from './types';

export const OPERATION_CLASSES = {
  classA: new Set<ActionType>([
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
  ] as const),
  classB: new Set<ActionType>([
    'HeadBucket',
    'HeadObject',
    'GetObject',
    'UsageSummary',
    'GetBucketEncryption',
    'GetBucketLocation',
    'GetBucketCors',
    'GetBucketLifecycleConfiguration',
  ] as const),
} as const;
