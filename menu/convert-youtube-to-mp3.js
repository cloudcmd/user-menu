export const convertYoutubeToMp3 = async ({CloudCmd, DOM}) => {
      const {View} = CloudCmd;
      const {Dialog} = DOM;

      const [, url] = await Dialog.prompt('YouTube URL:');

      if (!url)
          return;

      const {default: createElement}  = await import('https://cdn.skypack.dev/@cloudcmd/create-element')

      const element = createElement('iframe', {
          id: 'youtube-to-mp3',
          width: '100%',
          height: '100%',
          src: `https://convert2mp3s.com/api/single/mp3?url=${url}`,
          allowtransparency:"true" ,
          scrolling: 'no',
          style: 'border: none;',
          notAppend: true,
      });

      createElement('style', {
          parent: document.head,
          dataName: 'youtube-to-mp3-style',
          textContent: `
              .view:has(#youtube-to-mp3) {
                  overflow: hidden
              }
          `
      });

      await View.show(element, {
          autoSize: true,
      });
  };

export default {
     'Y - Youtube to mp3': convertYouTubeToMp3,
}
