const path = require("path");
const Dotenv = require("rspack-plugin-dotenv");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                type: "jsx",
            },
            {
                test: /\.ts$/,
                type: "tsx",
            },
        ],
    },
    entry: {
        main: "./src/index.tsx",
    },
    resolve: {
        alias: {
            process: "process/browser",
        },
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build"),
    },
    builtins: {
        html: [{ template: "./public/index.html" }],
    },
    plugins: [new Dotenv()],
};
