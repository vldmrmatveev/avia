const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all",
		},
	};
	if (isProd) {
		config.minimizer = [
			new TerserPlugin({ extractComments: false }),
			new CssMinimizerPlugin(),
		];
	}
	return config;
};

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	// entry: {
	// 	index: "@/js/index.js",
	// 	polyfill: "@babel/polyfill",
	// },
	entry: ["@babel/polyfill", "@/js/index.js", "@/style/style.scss"],
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [".js", ".json"],
		alias: {
			"@models": path.resolve(__dirname, "src/models"),
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimization: optimization(),
	devtool: isDev ? "source-map" : false,
	devServer: {
		port: 4000,
		hot: true,
	},
	plugins: [
		new LiveReloadPlugin({
			appendScriptTag: true,
		}),
		new MiniCssExtractPlugin({
			filename: "css/style.css",
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./index.pug",
			inject: true,
			minify: false,
		}),
		new HtmlWebpackPugPlugin(),
		new ESLintPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/favicon.ico"),
					to: path.resolve(__dirname, "dist"),
				},
				{
					from: path.resolve(__dirname, "src/img/upload"),
					to: path.resolve(__dirname, "dist/img/upload"),
				},
				{
					from: path.resolve(__dirname, "src/img/backgrounds"),
					to: path.resolve(__dirname, "dist/img/backgrounds"),
				},
				{
					from: path.resolve(__dirname, "src/fonts"),
					to: path.resolve(__dirname, "dist/fonts"),
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: isProd ? "pug-loader" : "pug-loader?pretty=true",
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							url: false,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"autoprefixer",
										{
											// Options
										},
									],
								],
							},
						},
					},
					{
						loader: "resolve-url-loader",
						options: {},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			// {
			// 	test: /\.[png|svg|jpg|jpeg|gif]$/,
			// 	use: "file-loader",
			// },
			// {
			// 	test: /\.[ttf|woff|woff2|eot]$/,
			// 	use: "url-loader",
			// },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
};
