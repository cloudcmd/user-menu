export const copyURLToCurrentFile = async ({DOM}) => {
    const {path} = DOM.CurrentInfo;
    const url = `${window.location.href}${path}`;
    const {default: clipboard}  = await import('https://cdn.skypack.dev/@cloudcmd/clipboard');

    await clipboard.writeText(url); 
};

export default {
    'F6 - Copy URL to Current File': copyURLToCurrentFile,
}
