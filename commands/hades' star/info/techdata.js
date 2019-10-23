let TechData = require("../../../Database/Hades' Star/techs.json")
const { RichEmbed } = require("discord.js")

module.exports = {
    name: "techdata",
    aliases: ["h"],
    category: "hades' star",
    subcategory: "info",
    description: "Returns info about a certain tech in a certain level.",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        let embed = new RichEmbed()
            .setColor("RANDOM")
        const tech = message.content.split(" ")

        if(!tech[1]) {
            let economytechs = ""
            let weapontechs = ""
            let miningtechs = ""
            let shieldtechs = ""
            let supporttechs = ""

            embed.setTitle(`**Known Techs**`)

            for(let techname1 in TechData){ 
                if(TechData[techname1].Category === "Economy") {
                    economytechs += `${techname1}.\n`
                }
            }
            for(let techname2 in TechData) { 
                if(TechData[techname2].Category === "Mining") {
                    miningtechs += `${techname2}.\n`
                }
            }
            for(let techname3 in TechData) { 
                if(TechData[techname3].Category === "Weapons") {
                    weapontechs += `${techname3}.\n`
                }
            }
            for(let techname4 in TechData) { 
                if(TechData[techname4].Category === "Support") {
                    supporttechs += `${techname4}.\n`
                }
            }
            for(let techname5 in TechData) { 
                if(TechData[techname5].Category === "Shields") {
                        shieldtechs += `${techname5}.\n`
                }
            }

            embed.addField("*Economy*", `${economytechs}`)
            embed.addField("*Mining*", `${miningtechs}`)
            embed.addField("*Weapons*", `${weapontechs}`)
            embed.addField("*Shields*", `${shieldtechs}`)
            embed.addField("*Support*", `${supporttechs}`)

            return message.channel.send(embed)
        }
        else {
            if(!TechData[tech[1]]) return message.channel.send(`There's no tech with said name!`)
            if(!tech[2]) {
                let techs = `${TechData[tech[1]].Description}\n`
                embed.setTitle(`**Tech: ${tech[1]}**`)
                embed.setDescription(techs)
                embed.setFooter(`You may add a number between 1 and 
                ${TechData[tech[1]].Level[TechData[tech[1]].Level.length - 1]} to get info about the required level`)
                return message.channel.send(embed)
            }
            else {
                if((1 > tech[2]) || Number(TechData[tech[1]].Level[TechData[tech[1]].Level.length - 1]) < (tech[2])) {
                    return message.channel.send(`The level you requested is invalid for that tech!`)
                }
                embed.setTitle(`**${tech[1]}**`)
                let a = 0
                const techinfo = Object.values(TechData[tech[1]])
                const techkeys = Object.keys(TechData[tech[1]])
                while(techkeys[a]){
                    
                    if(techkeys[a] === "Description") {
                        embed.addField(`*${techkeys[a]}*`, `${techinfo[a]}`)
                    }
                    else {
                        embed.addField(`*${techkeys[a]}*`, `${techinfo[a][tech[2] - 1]}`)
                    }
                    a++
                }
                return message.channel.send(embed)
            }
        }
    }
}