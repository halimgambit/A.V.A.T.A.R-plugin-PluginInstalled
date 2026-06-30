import fs from 'fs/promises';

export async function init () {

    await Avatar.lang.addPluginPak('PluginInstalled');

    try {
        const dir = './resources/app/core/plugins';
        const files = await fs.readdir(dir);

        info(" ===== PLUGINS =====");
        info(`Plugins: ✔ Loaded: ${files.length} Plugins`);

    } catch (err) {
        error(`PluginInstalled init error: ${err.message}`);
    }
}

export async function action(data, callback) {

    try {

        const Locale = await Avatar.lang.getPak('PluginInstalled', data.language);

        const tblActions = {
            pluginCount: () => pluginCount(data.client, Locale)
        };

		info("PluginInstalled:", data.action.command, "from", data.client);

            await tblActions[data.action.command]();

    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        error(err.message);
    }

    callback();
}

const pluginCount = async (client, Locale) => {

    try {
        const dir = './resources/app/core/plugins';
        const files = await fs.readdir(dir);

        Avatar.speak(Locale.get(["speech.pluginCount", files.length]), client, () => Avatar.Speech.end(client));

    } catch (err) {
        error(`PluginInstalled Error: ${err.message}`);
        Avatar.speak(Locale.get("speech.errorRead"), client, () => Avatar.Speech.end(client));
    }
};
