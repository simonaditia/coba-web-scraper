import * as cheerio from "cheerio"
import fetch from "node-fetch"
import fs from "fs"

const getPremiereLeaguePlayers = async () => {
    try {
        const response = await fetch("https://www.nba.com/players")
        const body = await response.text()
        const $ = cheerio.load(body)
        const items = []
        $(".players-list > tbody > tr").map((index, element) => {
            // const name = $(element).find("img").attr("src")
            const firstName = $(element).find(".RosterRow_playerName__G28lg p:first").text()
            const lastName = $(element).find(".RosterRow_playerName__G28lg p:last").text()
            const photo = $(element).find(".RosterRow_playerHeadshot__tvZOn img").attr("src")
            const team = $(element).find(".RosterRow_team__AunTP").text()
            const number = $(element).find("td:eq(2)").text()
            const position = $(element).find("td:eq(3)").text()
            const height = $(element).find("td:eq(4)").text()
            const weight = $(element).find("td:eq(5)").text()
            const country = $(element).find("td:last").text()

            items.push({
                firstName,
                lastName,
                photo,
                team,
                number,
                position,
                height,
                weight,
                country
            })
        })

        fs.writeFile("nba_players.json", JSON.stringify(items), (err) => {
            if (err) return console.log(err)
            console.log("NBA Players where saves as: nba_players.json")
        })
    } catch (error) {
        console.log(error)
    }
}

getPremiereLeaguePlayers()

const getFormulaOneDrivers = async () => {
    try {
        const response = await fetch("http://www.formula1.com/en/drivers.html")
        const body = await response.text()
        const $ = cheerio.load(body)
        // const wrapper = $(".listing-items--wrapper")
        // console.log(wrapper.length)
        const items = []
        $(".listing-items--wrapper > .row > .col-12").map((index, element) => {
            const rank = $(element).find(".rank").text()
            const points = $(element).find(".points > .f1-wide--s").text()
            const firstName = $(element).find(".listing-item--name span:first").text()
            const lastName = $(element).find(".listing-item--name span:last").text()
            const team = $(element).find(".listing-item--team").text()
            const photo = $(element).find(".listing-item--photo img").attr("data-src")

            items.push({
                rank,
                points,
                firstName,
                lastName,
                team,
                photo
            })
        })

        fs.writeFile("formula1.json", JSON.stringify(items), (err) => {
            if (err) return console.log(err)
            console.log("Formula 1 Drivers where saved as: formula1.json");
        })
    } catch (error) {
        console.log(error)
    }
}

// getFormulaOneDrivers()