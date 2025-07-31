import { useFeatureFlag } from '@/lib/posthog-client';

const FeatureFlagBanner = () => {
  const showBanner = useFeatureFlag('test-banner');

  if (!showBanner) return null;

  return (
    <div className="w-full bg-posthog-primary text-white py-2 px-4 text-center text-sm font-medium">
      🚩 This is a feature flag test showing to 50% of users
    </div>
  );
};

export default FeatureFlagBanner;