module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['react-native-reanimated/plugin'],
        [
            'module:react-native-dotenv',
            {
                envName: ['REACT_NATIVE_BASE_URL'],
                moduleName: '@env',
                path: '.env',
            },
        ],
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@': './src',
                },
            },
        ],
    ],
};
