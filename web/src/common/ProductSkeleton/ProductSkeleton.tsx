import { Skeleton } from '@mui/material';

function ProductSkeleton({ limit }: { limit: number }) {
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < limit; i++) {
      skeletons.push(
        <div key={i} className='flex flex-col'>
          <Skeleton
            variant='rectangular'
            width={'100%'}
            height={300}
          />
          <Skeleton
            height={24}
            width={'80%'}
          />
          <Skeleton
            height={30}
            width={'40%'}
          />
        </div>
      );
    }
    return skeletons;
  };

  return <>{renderSkeletons()}</>;
}

export default ProductSkeleton;
