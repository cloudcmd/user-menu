const isMp3 = (a) => /\.mp3$/.test(a);

export default {
    'F - Convert flac to mp3': convertFlacToMp3,
    'M - Convert mp4 to mp3': convertMp4ToMp3,
};

export async function convertFlacToMp3({DOM, CloudCmd}) => {
      const command = 'for f in *.flac; do ffmpeg -vsync 2 -i "$f" -b:a 320k "${f%flac}mp3"; done';
      await convert(command, {
          DOM,
          CloudCmd,
      });
}

export async function convertMp4ToMp3({DOM, CloudCmd}) => {
    const command = 'for f in *.mp4; do ffmpeg -i "$f" "${f%mp4}mp3"; done';
    await convert(command, {
        DOM,
        CloudCmd,
    });
}

async function convert(command, {DOM, CloudCmd}) {
    const {IO, Dialog, CurrentInfo} = DOM;

    const root = CloudCmd.config('root');
    const cwd = `${root}${CurrentInfo.dirPath}`;

    const exitCode = await CloudCmd.TerminalRun.show({
        cwd,
        command: `bash -c '${command}'`,
    });

    if (exitCode === -1)
        return Dialog.alert(`☝️ Looks like Terminal is disabled, start Cloud Coammnder with '--terminal' flag.`);

    if (exitCode)
        return Dialog.alert(`☝️ Looks like something bad happend. Exit code: ${exitCode}`);

    await CloudCmd.refresh();

    const names = DOM.getFilenames(CurrentInfo.files);
    const mp3Names = names.filter(isMp3);

    const from = CurrentInfo.dirPath;
    const to = `${from}mp3`

    await IO.move(from, to, mp3Names);
    await CloudCmd.refresh();
}
