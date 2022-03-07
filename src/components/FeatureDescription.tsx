import { IFeatureProps } from '../lib/interfaces';

const FeatureDescription = ({ feature }: IFeatureProps) => {
  return (
    <>
      <dt>
        <div className="absolute flex items-center justify-center w-12 h-12 text-orange-600 rounded-md bg-orange-200/70 dark:bg-orange-400 dark:text-orange-700">
          <feature.icon className="w-6 h-6" aria-hidden="true" />
        </div>
        <p className="ml-16 text-lg font-black leading-6">{feature.name}</p>
      </dt>
      <dd className="mt-2 ml-16 font-sans text-base text-neutral-500 dark:text-neutral-300">
        {feature.description}
      </dd>
    </>
  );
};

export default FeatureDescription;
