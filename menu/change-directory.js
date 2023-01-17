export default {
    'R - cd /': async ({CloudCmd}) => {
        await CloudCmd.changeDir('/');
    }
}
