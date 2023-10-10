/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["react-daisyui"],
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.dicebear.com",
				port: "",
				pathname: "/6.x/pixel-art/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/chatilie/image/upload/**",
			},
		],
	},
};

module.exports = nextConfig;
