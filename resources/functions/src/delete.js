module.exports = async (message, mesaj) => {
    let args = mesaj.split(" ").slice(1);
    if (!args[0]) {
        message.channel.send("Zi-mi un numar de mesaje");
        return;
    }
    if (args[0] > 100) {
        var i = 0, maxim = args[0] / 100;
        await message.delete();
        while (i < maxim) {
            message.channel.bulkDelete(100);
            i++;
        }
        message.channel.bulkDelete(args[0] % 100);

        return;
    }
    await message.delete();
    message.channel.bulkDelete(args[0]);
    delete args;
}