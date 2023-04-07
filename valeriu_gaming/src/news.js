
class Capital {

    constructor(options) {
        this.message = options.message;
        this.winFooter = options.winFooter;
        this.winColor = options.winColor
        this.lostColor = options.lostColor;
        this.lostFooter = options.lostFooter;
        this.questionColor = options.questionColor;
        this.questionFooter = options.questionFooter;
        this.stopCommand = options.stopCommand

    }
    async start() {
        var ok;
        const fetch = require("node-fetch")
        const Discord = require('discord.js');
        const { MessageButton } = require("discord-buttons");

        

        var requestOptions = {
            method: 'GET',
            Authorization: "UVpkVWJMYTdlY0lOcFhGNUkzNm56RlFNc0tqdjZoRkNUSlJxZUpkZw==",
            redirect: 'follow'
        };

        fetch("https://api.countrystatecity.in/v1/countries/IN", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}

module.exports = Capital;
