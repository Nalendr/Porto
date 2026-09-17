/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubActions ? '/Porto' : '');

const nextConfig = {
  ...(isGithubActions && { output: 'export' }),
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
